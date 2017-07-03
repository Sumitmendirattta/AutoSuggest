/*
Created By SumitMendiratta
*/

$(function(){
  $.widget( "custom.catcomplete", $.ui.autocomplete, {
    _renderMenu: function( ul, items ) {
      var that = this,
      currentType = "";
      $.each( items, function( index, item ) {
        if ( item.category != currentType ) {
          ul.append( "<li class='ui-autocomplete-category ui-state-highlight'><b>" + item.category + "</b></li>" );
          that._renderItemData( ul, item);
          ul.append(" <li>" +"&nbsp;&nbsp; <b>Details:</b> with URL "+ item.link + "</li>");
          currentType = item.category;
        }
        
      });
    }
  });

  var xhr;
  $( "input" ).catcomplete({
    delay: 0,
    source: function( request, response ) {
      var regex = new RegExp(request.term, 'ig');
      if(xhr){
        xhr.abort();
      }

      xhr = $.ajax({
          url: "data.json",
          dataType: "json",
          cache: false,
          success: function(data) {
           response($.map(data.products, function(item) {
              if(regex.test(item.name)){
                return {
                    label: item.name,
                    category: item.type,
                    link: item.url,
                    desc: item.asc
                };
              }
            }));
          }
      });
    },
    minlength:0
  });
});