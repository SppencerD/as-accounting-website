document.addEventListener('DOMContentLoaded', function(){
  var forms = document.querySelectorAll('form[action^="https://formspree.io/f/"]');
  forms.forEach(function(form){
    // Ensure placeholder endpoint
    if (form.action.indexOf('/yourformid') === -1) {
      // leave if user already set real endpoint
    }
    // Determine thanks URL by page language
    var isEn = document.documentElement.lang && document.documentElement.lang.toLowerCase().startsWith('en');
    var redirectUrl = isEn ? '/en/thanks/' : '/obrigado/';
    // Add hidden _redirect input for Formspree
    if (!form.querySelector('input[name="_redirect"]')){
      var hidden = document.createElement('input');
      hidden.type = 'hidden';
      hidden.name = '_redirect';
      hidden.value = redirectUrl;
      form.appendChild(hidden);
    }
  });
});


