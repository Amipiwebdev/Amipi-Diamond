var mobile = (/iphone|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));
$(document).ready(function(){

   $(":checkbox").click(function(){
    var id = $(this).attr('id');
    var name = $(this).attr('name');
    var check = $(this).is(':checked');
    var bg_color = localStorage.getItem('bg_color');
    var text_color = localStorage.getItem('text_color');
    //console.log(name)
    if(name=="ha[]" || name=="culet[]" || name=="color[]" || name=="fluorescence[]" || name=="hca[]" 
      || name=="clarity[]" || name=="cut[]" || name=="polish[]" || name=="symmetry[]" || name=="cert[]")
    {
       $(this).parent().toggleClass("active-label");

       if($(this).parent().hasClass("active-label")){
          $(this).parent().css("background-color", bg_color)
       }else{
          $(this).parent().css("background-color",'')
       } 
    }
    else if(name=="checkbox[]")
    { 
       $(this).closest('li').toggleClass("active");
        if($(this).closest('li').hasClass("active")){
          $('.tps_diamond_shapes li .active img').css("border-color",'')
        }else{
          $('.tps_diamond_shapes li img').css("border-color",'')
        } 
    }
    else if(name=="ex3")
    {
        uncheckCPSF();
        $(this).closest("li").toggleClass("active-label");
        $('#ex3n,#non_fluor').prop("checked",false); 
        $('#ex3n,#non_fluor').closest("li").removeClass("active-label"); 
        //console.log(check)
        $('#ex_cut,#ex_polish,#ex_symmetry').prop("checked",check);
        if(check){
          $('#ex_cut,#ex_polish,#ex_symmetry').closest("li").addClass("active-label");
          $('#ex_cut,#ex_polish,#ex_symmetry').closest("li").css("background-color", bg_color)
        }
        else{
          $('#ex_cut,#ex_polish,#ex_symmetry').closest("li").removeClass("active-label");
          $('#ex_cut,#ex_polish,#ex_symmetry').closest("li").css("background-color",'')
        }
        
        if($(this).parent().hasClass("active-label")){
          $(this).parent().css("background-color", bg_color)
        }else{
          $(this).parent().css("background-color",'')
        }
    }      
    else if(name=="ex3n")
    {
        uncheckCPSF();
        $(this).closest("li").toggleClass("active-label");
        $('#ex3').prop("checked",false); 
        $('#ex3').closest("li").removeClass("active-label"); 
        $('#ex_cut,#ex_polish,#ex_symmetry,#non_fluor').prop("checked",check);
        if(check) {
          $('#ex_cut,#ex_polish,#ex_symmetry,#non_fluor').closest("li").addClass("active-label");
          $('#ex_cut,#ex_polish,#ex_symmetry,#non_fluor').closest("li").css("background-color", bg_color)
        }
        else {
          $('#ex_cut,#ex_polish,#ex_symmetry,#non_fluor').closest("li").removeClass("active-label");
          $('#ex_cut,#ex_polish,#ex_symmetry,#non_fluor').closest("li").css("background-color",'')
        }

        if($(this).parent().hasClass("active-label")){
          $(this).parent().css("background-color", bg_color)
        }else{
          $(this).parent().css("background-color",'')
        }
    }
    else if(name=="view_as[]") {       
        viewAs(id);
    }

   });
   var segment_1 = "diamond";
   if(segment_1=="diamond"){
       const dia_view = localStorage.getItem('dia_view');
       if(dia_view) {
           viewAs(dia_view);
       } else {
           if(mobile) {
               viewAs('view_as_grid');
           } else {
               viewAs('view_as_list');
           }
       }
    }

});

function viewAs(id) {
    localStorage.setItem('dia_view', id);
    var bg_color = localStorage.getItem('bg_color');    
    if(id=='view_as_grid') {
      
       $("#view_as_list").prop("checked",false);
       $(".fa-list").removeClass("active");
       $(".fa-th").addClass("active");
       $("#per_page").val('50');
       
      $(".fa-th").css("background-color", bg_color)
      $(".fa-list").css("background-color",'')

    }else if(id=='view_as_list') { 
       $("#view_as_grid").prop("checked",false);
       $(".fa-th").removeClass("active");
       $(".fa-list").addClass("active");
       $("#per_page").val('50');

       $(".fa-th").css("background-color", '')
       $(".fa-list").css("background-color",bg_color)
    }
    submitForm();
}

function uncheckCPSF() {
  $('.cut_check,.pol_check,.sym_check,.fluor_check').prop("checked",false);
  $('.cut_check,.pol_check,.sym_check,.fluor_check').closest("li").removeClass("active-label");
}
        
$(document).ready(function(){
    $(':checkbox:checked').each(function(){
      var val = $(this).attr('id');
      var val_class = $(this).attr('name');
      //alert(val_class);
      if(val_class=="checkbox[]")
      {
        $('label[for="' + val + '"]').addClass("active1");
      }
      else
      {
        $('label[for="' + val + '"]').addClass("active1"); 
      }
    });
});
// ++++++++++++++++++++Search++++++++++++++++++++++++++++++++++++++++++
function toggleFilter(e) {
    const text = ($(e).text() == 'Show Filter') ? 'Hide Filter' : 'Show Filter';
    $(e).text(text);
    $("#filter").toggle();
}
// ++++++++++++++++++++Advance Search++++++++++++++++++++++++++++++++++++++++++
function show_search(){  
  var bg_color = localStorage.getItem('bg_color');             
    $("#more_filter").slideDown("3000");                
    $(".hide_show").html('<a href="javascript:void(0)" class="btn"><span class="bg_color" style="background-color:'+bg_color+'" onclick="hide_search()" id="hide_advance"><i class="plus-toggle fa fa-minus"> </i> Hide Advance Filter</span></a>');        
}
function hide_search(){
  var bg_color = localStorage.getItem('bg_color');
    $("#more_filter").slideUp("3000");               
    $(".hide_show").html('<a href="javascript:void(0)" class="btn"><span class="bg_color" style="background-color:'+bg_color+'" onclick="show_search()" id="show_advance"><i class="plus-toggle fa fa-plus"> </i> Show Advance Filter</span></a>');
    //document.body.scrollTop = 0; // For Chrome, Safari and Opera 
    //document.documentElement.scrollTop = 0; // For IE and Firefox
}   
//+++++++++++++++++++ Match Diamond +++++++++++++++++++++++++++++++++
function show_parameters(){               
    $("#MatchFilterDiv").slideDown("3000");                
    $(".hide_show1").html('<a href="javascript:void(0)" class="btn"><span id="show_parameters" onclick="hide_parameters()"><i class="fa fa-arrow-circle-up"></i> Hide Parameters</span></a>');        
}
function hide_parameters(){
    $("#MatchFilterDiv").slideUp("3000");               
    $(".hide_show1").html('<a href="javascript:void(0)" class="btn"><span id="show_parameters" onclick="show_parameters()"><i class="fa fa-arrow-circle-down"></i> Show Parameters</span></a>');        
}