if (typeof (Pentare) == "undefined") {
    Pentare = {};
}

Pentare.DesafioJs = {

    formContext: {},

    OnLoad: function (executionContext) {
        Pentare.DesafioJs.formContext = executionContext.getFormContext();
        Pentare.DesafioJs.ValidarTelefones();
    },

    OnChange: function (executionContext) {
        Pentare.DesafioJs.formContext = executionContext.getFormContext();  
        Pentare.DesafioJs.ValidarTelefones();
        Pentare.DesafioJs.ValidarEmail();
    },

    OnSave: function (executionContext) {
        Pentare.DesafioJs.formContext = executionContext.getFormContext();
        
        if (!Pentare.DesafioJs.ValidarTelefones()){
            executionContext.getEventArgs().preventDefault();
            return;
        }

        if(!Pentare.DesafioJs.ValidarEmail()){
            executionContext.getEventArgs().preventDefault();
            return;
        }
    },



ValidarTelefones: function () {
    var formContext = Pentare.DesafioJs.formContext;
    var valido = true;
    var val_telephone1 = (Pentare.DesafioJs.formContext.getAttribute("telephone1").getValue() || "").replace(/\D/g, "");
    var control_telephone1 = Pentare.DesafioJs.formContext.getControl("telephone1");

    //telephone1

    if (val_telephone1 == null || val_telephone1.trim() === "") {
        control_telephone1.clearNotification("telefone_invalido");
    }
    else {

        if (val_telephone1.length != 10 && val_telephone1.length != 11) {
            control_telephone1.setNotification("Informe um telefone válido.", "telefone_invalido");
            valido = false;
        }

        if (val_telephone1.length === 10 || val_telephone1.length === 11) {
            control_telephone1.clearNotification("telefone_invalido");
        }
    }


    //mobilephone

    var val_celular = (Pentare.DesafioJs.formContext.getAttribute("mobilephone").getValue() || "").replace(/\D/g, "");
    var control_celular = Pentare.DesafioJs.formContext.getControl("mobilephone");

    if (val_celular == null || val_celular.trim() === "") {
        control_celular.clearNotification("celular_invalido");
    }
    else {

        if (val_celular.length != 11 && val_celular.length != 10) {
            control_celular.setNotification("Informe um número de celular válido", "celular_invalido");
            valido = false;
        }

        if (val_celular.length === 10 || val_celular.length === 11) {
            control_celular.clearNotification("celular_invalido");
        }
    }

    return valido;
},

ValidarEmail: function () {
    var formContext = Pentare.DesafioJs.formContext;
    var atributo_email = formContext.getAttribute("emailaddress1");
    var ctr_email = formContext.getControl("emailaddress1");

    if (!atributo_email) {
        return true;
    }

    var val_email = atributo_email.getValue() || "";

    if (val_email.toLowerCase().includes("teste.com")) {
        if (ctr_email) {
            ctr_email.setNotification(
                "E-mails com teste.com não são permitidos.",
                "testeemail"
            );
        }
        return false;
    } else {
        if (ctr_email) {
            ctr_email.clearNotification("testeemail");
        }
        return true;
    }
},
}