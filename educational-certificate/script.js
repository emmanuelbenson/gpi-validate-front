
// Hide all form error holders
$('.help-block').addClass('hidden')

// Configure Toastr Alert
toastr.options = {
    "closeButton": true,
    "debug": false,
    "positionClass": "toast-top-full-width",
    "onclick": null,
    "showDuration": "1000",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

// Submit Verification request
$('#educertForm').on('submit', (function(e){
	App.blockUI({
    	boxed: true,
    	message: 'Please wait...'
    });

	e.preventDefault();

	$.ajax({
		url: 'http://localhost:3003/api/v2/educational-certificate/new',
		method: 'POST',
		data: new FormData(this),
		contentType: false,
        cache: false,
   		processData:false
	}).done(res => {
		var response = JSON.parse(res)

		toastr.success(response.message, "Success")
		setTimeout(() => {
			document.location.href = 'index.html'
		}, 3000)

	}).fail(err => {
		App.unblockUI();
		if (err.status === 422 ){
			toastr.error("Please check the fileds in red for error", "Form Error!")

			var errors = JSON.parse(err.responseText)
			ErrorChecker(errors)
		}
	})
}))


// ErrorChecker checks for form errors and displays them appropriately 
function ErrorChecker( errors ) {
	// Hide all form error holders
	$('.help-block').addClass('hidden')
	$('#firstName').parent().removeClass('has-error')
	$('#lastName').parent().removeClass('has-error')
	$('#otherName').parent().removeClass('has-error')
	$('#type').parent().removeClass('has-error')
	$('#doc-error').parent().parent().removeClass('has-error')
	$('#doc-error').addClass('hidden')

	if(errors.length > 0){
		$.each(errors, function(i, v){
			if(v.FirstName) {
		        $('#firstName').next('.help-block').removeClass('hidden')
		        $('#firstName').next('.help-block').html(v.FirstName)
		        $('#firstName').parent().addClass('has-error')
		        formState = false
		    }

		    if(v.LastName) {
		        $('#lastName').next('.help-block').removeClass('hidden')
		        $('#lastName').next('.help-block').html(v.LastName)
		        $('#lastName').parent().addClass('has-error')
		        formState = false
		    }

		    if(v.OtherName) {
		        $('#otherName').next('.help-block').removeClass('hidden')
		        $('#otherName').next('.help-block').html(v.OtherName)
		        $('#otherName').parent().addClass('has-error')
		        formState = false
		    }

		    if(v.Title) {
		        $('#title').next('.help-block').removeClass('hidden')
		        $('#title').next('.help-block').html(v.Title)
		        $('#title').parent().addClass('has-error')
		        formState = false
		    }

		    if(v.Type) {
		        $('#type').next('.help-block').removeClass('hidden')
		        $('#type').next('.help-block').html(v.Type)
		        $('#type').parent().addClass('has-error')
		        formState = false
		    }

		    if(v.Document) {
		        $('#doc-error').removeClass('hidden')
		        $('#doc-error').html(v.Document)
		        $('#doc-error').parent().parent().addClass('has-error')
		        formState = false
		    }
		})
	}
}

// Clear form
function clearForm(){
	$('#educertForm').get(0).reset()
}

