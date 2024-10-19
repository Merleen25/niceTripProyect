
const calcularDias = () => {
    const timeUnDia = 24 * 60 * 60 * 1000;
    const fIniEle = $("#fechaInicio");
    const fFinEle = $("#fechaFin");
    const noDiasEle = $("#noDias");
    const totalPagarEle = $("#totalPagar");
    const precioDia = totalPagarEle.data("precioDia");
    const fIniDate = new Date(fIniEle.val());
    const fFinDate = new Date(fFinEle.val());
    const difDay = (fFinDate.getTime() - fIniDate.getTime()) / timeUnDia;
    const totalPagar = (difDay * precioDia);
    noDiasEle.val(difDay);
    totalPagarEle.val("$" + totalPagar);
    totalPagarEle.attr("data-total-pagar", totalPagar);
};

const cambiarFechaInicio = () => {
    const timeUnDia = 24 * 60 * 60 * 1000;
    const fIniEle = $("#fechaInicio");
    const fFinEle = $("#fechaFin");
    const fIniVal = fIniEle.val();
    const fIniValMasUnDia = new Date(new Date(fIniVal).getTime() + timeUnDia).toISOString().slice(0,10);
    fFinEle.val(fIniValMasUnDia);
    fFinEle.attr("min", fIniValMasUnDia);
    calcularDias();
};

const guardarReserva = () => {
    const creditCard = $("#creditCard").val();
    const fechaTarjeta = $("#fechaTarjeta").val();
    const cvv = $("#cvv").val();
    if (!$("#terminosCondiciones").prop("checked")) {
        alert("Debe aceptar los terminos y condiciones de la reserva");
    } else if (containsOnlyDigits(creditCard) && (fechaTarjeta) && containsOnlyDigits(cvv)){
        $("#guardarReservaButton").prop('disabled', true);
        const fIniEle = $("#fechaInicio");
        const fFinEle = $("#fechaFin");
        const totalPagarEle = $("#totalPagar");
        const idClienteEle = $("#idCliente");
        const idVehiculoEle = $("#idVehiculo");

        const autorizacion = Math.floor(Math.random() * 999999).toString().padStart(6, '0');
        const bodyReq = {
            idCliente: idClienteEle.val(),
            idVehiculo: idVehiculoEle.val(),
            fechaInicio: fIniEle.val(),
            fechaFin: fFinEle.val(),
            totalPagar: totalPagarEle.data("totalPagar"),
            noAutorizacion: autorizacion
        };
        $.ajax({
            type: "POST",
            url: "/guardarReserva",
            data: bodyReq,
            success: (data) => {
                window.location.href = "/mis-reservas";
                //console.log('data:', data);
            }
        });
    } else {
        alert('ERROR: Por favor verifique los datos de su tarjeta');
    }
}

function printPageArea(areaID){
    var printContent = document.getElementById(areaID).innerHTML;
    var originalContent = document.body.innerHTML;
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
}

function containsOnlyDigits(str) {
    return /^\d+$/.test(str);
}

const condicionCancelacion = (id, fechaInicio, montoTotal) => {
    const dateInicio = moment(fechaInicio);
    const dateHoy = moment(new Date().toISOString().slice(0,10));
    const dias = dateInicio.diff(dateHoy, 'days');
    let cargoPorCancelacion = 0;
    let content = 'Al cancelar esta reservación usted no tendrá ningún cargo (<b>Q.0 de penalizacion</b>), para más información revisar nuestros términos y condiciones <a href="/politicas">aquí.</a>';
    if (dias == 1) {
        cargoPorCancelacion = montoTotal * 0.3;
        content = "Al cancelar esta reservación usted será penalizado con un cobro de 30% del precio total de la renta (<b>Q."+cargoPorCancelacion+" de penalizacion</b>), para más información revisar nuestros términos y condiciones <a href='/politicas'>aquí.</a>";
    } else if (dias < 1) {
        cargoPorCancelacion = montoTotal * 0.5;
        content = 'Al cancelar esta reservación usted será penalizado con un cobro de 50% del precio total de la renta(<b>Q.'+cargoPorCancelacion+' de penalizacion</b>), para más información revisar nuestros términos y condiciones <a href="/politicas">aquí.</a>';
    }
    $("#"+id).html(content);
};



const guardarPerfil = () => {
    const correoElectronicoEle = $("#correoProfile").val();
    const telefonoValidation = containsOnlyDigits($("#numerTelefonoProfile").val());
    if (!telefonoValidation){
        alert('Numero de telefono invalido.');
    }
    else if (!validarEmail(correoElectronicoEle)) {
        alert("Debe validar su correo electrónico.");
    } else {
        $("#guardarPerfilButton").prop('disabled', true);
        const nombreEle = $("#nombreProfile");
        const apellidoEle = $("#apellidoProfile");
        const telefonoEle = $("#numerTelefonoProfile");
        const direccionEle = $("#direccionProfile");
        const passwordEle = $("#passwordProfile");

        const bodyReq = {
            nombre: nombreEle.val(),
            apellido: apellidoEle.val(),
            numeroTelefono: telefonoEle.val(),
            correoElectronico: correoElectronicoEle,
            direccion: direccionEle.val(),
            clave: passwordEle.val(),
        };

        $.ajax({
            type: "POST",
            url: "/guardarPerfil",
            data: bodyReq,
            success: (data) => {
                window.location.href = "/";
            },
            error: (xhr, status, error) => {
                alert("ERROR: Algo salió mal.");
                console.error(error);
            }
        });
    }
}

function validarEmail(email){
                
	var validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

	if( validEmail.test(email) ){
		return true;
	}else{
		return false;
	}
} 