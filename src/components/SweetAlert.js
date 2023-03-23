import Swal from "sweetalert2";
var title;
var icon;

export default function sweetAlert(type, text, url) {
    // Se compara el tipo de mensaje a mostrar.
    switch (type) {
        case 1:
            title = "Éxito";
            icon = "success";
            break;
        case 2:
            title = "Error";
            icon = "error";
            break;
        case 3:
            title = "Advertencia";
            icon = "warning";
            break;
        case 4:
            title = "Aviso";
            icon = "info";
    }
    // Si existe una ruta definida, se muestra el mensaje y se direcciona a dicha ubicación, de lo contrario solo se muestra el mensaje.
    if (url) {
        Swal.fire({
            title: title,
            text: text,
            icon: icon,
            allowEscapeKey: false,
            allowOutsideClick: false,
            confirmButtonText: "Aceptar",
            background: "#F7F0E9",
            confirmButtonColor: "green",
        }).then(function () {
            location.href = url;
        });
    } else {
        Swal.fire({
            title: title,
            text: text,
            icon: icon,
            allowEscapeKey: false,
            allowOutsideClick: false,
            confirmButtonText: "Aceptar",
            background: "#F7F0E9",
            confirmButtonColor: "green",
        });
    }
}

export function confirmationSwal(mensaje) {
    return new Promise(resolve => {
        Swal.fire({
            title: "Advertencia",
            text: mensaje,
            icon: "warning",
            showDenyButton: true,
            confirmButtonText: "Si",
            denyButtonText: "Cancelar",
            allowEscapeKey: false,
            allowOutsideClick: false,
            background: "#F7F0E9",
            confirmButtonColor: "green",
        }).then(function (value) {
            // Se comprueba si fue cliqueado el botón Sí para hacer la petición de borrado, de lo contrario no se hace nada.
            if (value.isConfirmed) {
                resolve(true);
            } else {
                resolve(false);
            }
        });
    });
}
