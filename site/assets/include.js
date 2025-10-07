(function(){
  function siteBase(){
    var path = location.pathname;
    var i = path.indexOf('/site/');
    if (i === -1) return '/site/';
    return path.substring(0, i + 6); // include '/site/'
  }
  function inject(id, url){
    var el = document.getElementById(id);
    if (!el) return;
    fetch(url).then(function(r){ return r.text(); }).then(function(html){ el.innerHTML = html; });
  }
  document.addEventListener('DOMContentLoaded', function(){
    var base = siteBase();
    inject('site-header', base + 'shared/header.html');
    inject('site-footer', base + 'shared/footer.html');
  });
})();


