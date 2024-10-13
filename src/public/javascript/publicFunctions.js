
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
    if (creditCard && fechaTarjeta && cvv){
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
    }
}

function printPageArea(areaID){
    var printContent = document.getElementById(areaID).innerHTML;
    var originalContent = document.body.innerHTML;
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
}
