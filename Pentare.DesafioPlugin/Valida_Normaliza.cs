using LS.Utils;
using Microsoft.Xrm.Sdk;
using Pentare.DesafioPlugin;
using Microsoft.Xrm.Sdk.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pentare.DesafioPlugin
{
    public class Valida_Normaliza : PluginBoilerplate
    {
        public override void Action(IPluginExecutionContext context, IOrganizationService service, ITracingService trace)
        {

            if (context.InputParameters["Target"] == null || !(context.InputParameters["Target"] is Entity))
            {
                return;
            }

            if (!context.InputParameters.Contains("Target") || !(context.InputParameters["Target"] is Entity)) 
            { 
                return; 
            }

            var target = context.InputParameters["Target"] as Entity;
            
            var TITLE_ATTR = "title";
            var ORIGEMCADASTRO_ATTR = "ptr_origemcadastro";

            if ((!target.Attributes.ContainsKey(TITLE_ATTR)))
            {
                return;
            }

            var TITLE_VAL = target[TITLE_ATTR] as string;
            if (TITLE_VAL == null || TITLE_VAL == "")
            {
                throw new InvalidPluginExecutionException("Título inválido!!!!!!");
            }

            target[TITLE_ATTR] = TITLE_VAL.Trim();
            target[ORIGEMCADASTRO_ATTR] = "Plugin Dynamics 365";

            ///

            var titulo = TITLE_VAL.Trim();
            var cliente = target.GetAttributeValue<EntityReference>("customerid");

            if (cliente != null)
            {
                var query = new QueryExpression("incident")
                {
                    ColumnSet = new ColumnSet(false),   // só precisa saber se existe
                    TopCount = 1,
                    NoLock = true
                };
                query.Criteria.AddCondition("statecode", ConditionOperator.Equal, 0);
                query.Criteria.AddCondition("title", ConditionOperator.Equal, titulo);
                query.Criteria.AddCondition("customerid", ConditionOperator.Equal, cliente.Id);

                var resultado = service.RetrieveMultiple(query);

                trace.Trace("Duplicidade: {0} registro(s) encontrado(s).", resultado.Entities.Count);

                if (resultado.Entities.Count > 0)
                    throw new InvalidPluginExecutionException(
                        "Já existe um caso ativo com este título para o mesmo cliente.");
            }
        }
        
    }
}

