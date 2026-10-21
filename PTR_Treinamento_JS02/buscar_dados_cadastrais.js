if (typeof (Pentare) == "undefined") {
    Pentare = {};
}

Pentare.DesafioJs = {

    formContext: {},

    OnLoad: function (executionContext) {
        Pentare.DesafioJs.formContext = executionContext.getFormContext();
    
    },

    OnChange: function (executionContext) {
        Pentare.DesafioJs.formContext = executionContext.getFormContext();  
        Pentare.DesafioJs.Buscar_Dados();
    },

    OnSave: function (executionContext) {
        Pentare.DesafioJs.formContext = executionContext.getFormContext();
        
        
    },

    Buscar_Dados: async function () {
    try {
        var formContext = Pentare.DesafioJs.formContext;
        var lookup_cliente = Pentare.DesafioJs.formContext.getAttribute("customerid");
        var email_atributo = Pentare.DesafioJs.formContext.getAttribute("ptr_emailcliente");
        var telefone_atributo = Pentare.DesafioJs.formContext.getAttribute("ptr_telefonecliente");

        var valor_cliente = lookup_cliente.getValue();

        if (valor_cliente == null || valor_cliente.length === 0) {
            email_atributo.setValue(null);
            telefone_atributo.setValue(null);
            return;
        }

        var id_cliente = valor_cliente[0].id.replace("{", "").replace("}", "");

        var tabela_cliente = valor_cliente[0].entityType;

        if (tabela_cliente !== "contact") {
            email_atributo.setValue(null);
            telefone_atributo.setValue(null);
            return;
        }

        var resultado = await Xrm.WebApi.retrieveRecord(
            "contact",
            id_cliente,
            "?$select=emailaddress1,telephone1"
        );

        email_atributo.setValue(resultado.emailaddress1);
        telefone_atributo.setValue(resultado.telephone1);
    }
    catch (e) {
        console.log("Erro em Buscar_Dados: " + e.message);
    }
},
}