if (typeof jQuery !== "undefined") {

    $( document ).ajaxError(function( event, xhr, settings, thrownError )
    {
        $("#loading_peel9").hide();

        if (xhr.responseText == "Logout")
        {
            Swal.fire({
                title: 'Session expired',
                text: 'Please log in again',
                icon: 'error',
                confirmButtonText: 'Go to Login Page',

            }).then(() => {
                location.href = "/logout2";
            });

            setTimeout(()=> {  location.href = "/logout2" }, 30 * 1000)
        }
        else if (xhr.status === 401)
        {
            Swal.fire({
                title: 'Access Denied !!!',
                html: xhr.responseText,
                icon: 'error',
                confirmButtonText: 'OK',
                footer : `<div style="text-align:center">The Power Admin user of the department can grant permission. Please contact him/her</div>`

            }).then(()=>{
                if (typeof  parent.$.colorbox !== "undefined" && typeof parent.$.colorbox.element() !== "undefined" )
                {
                  parent.$.colorbox.close();
                }
            });
        }
        else if (xhr.status === 404 && xhr.statusText === "Not Found")
        {
            Swal.fire({
                title: 'Not Found',
                text: "The requested url has not been found",
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
        else if (xhr.status === 404 && xhr.statusText === "error")
        {
            /*
            Swal.fire({
                title: 'Server Not Responding',
                text: "The server is temporarily not responding",
                icon: 'error',
                confirmButtonText: 'OK',
            });
            */
        }
        else if (xhr.status >= 500)
        {
            if (xhr.status == 504) return; //Ignore Gateway Timeout error
            if (xhr.status == 502) {
                console.error('502 error triggered');
                return; //Ignore Bad Gateway error
            } 
           

            Swal.fire({
                title: 'An error occurred',
                html: xhr.responseText,
                icon: 'error',
                confirmButtonText: 'OK',
            });

        }
    });
}

