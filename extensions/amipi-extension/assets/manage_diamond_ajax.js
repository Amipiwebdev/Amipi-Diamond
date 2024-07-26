$(document).ready(function(){
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    var base_url = '';
    segment_1 ='';
	var url=`${location.origin}/apps/proxy?shop=${Shopify.shop}`; 
    loadMoreData(url);

    var text_color = localStorage.getItem('text_color');
    $(".text_color").css("color", text_color);
    var font_size = localStorage.getItem('font_size');
    $(".font_size").css("font-size", font_size);
    // let table = new DataTable('#example');  
           
    // Add a scroll event listener to the scrollable div
    var scrollableDiv = document.getElementById('grid_diamond');
    scrollableDiv.addEventListener('scroll', function() {
        if (scrollableDiv.scrollTop + scrollableDiv.clientHeight >= scrollableDiv.scrollHeight) {
            scrolling_pagination();
            // setTimeout(scrolling_pagination, 2000); // Optionally, delay loading for 2 seconds
        }
    });

    // Add a scroll event listener to the scrollable div
    var listscrollableDiv = document.getElementById('list_diamond');
    listscrollableDiv.addEventListener('scroll', function() {
        if (listscrollableDiv.scrollTop + listscrollableDiv.clientHeight >= listscrollableDiv.scrollHeight) {
            scrolling_pagination();
            // setTimeout(scrolling_pagination, 2000); // Optionally, delay loading for 2 seconds
        }
    });


    function scrolling_pagination(){ 
        var per_pages=$("#per_page").val();
        var pages=$("#per_pages").val();
        var page_plus = Number(per_pages) + 50;
        var totalpage = $("#per_page").val(page_plus);
        submitForm();
    }
    
});

let timerId;
const debounceFunction = (func, delay) => {
    clearTimeout(timerId);
    timerId = setTimeout(func, delay);
}

function submitForm() {
    // var url=base_url+'load-more-diamond?page=';    
    // var url='https://e3fab2-therealdealforyou.myshopify.com/apps/proxy?shop=e3fab2-therealdealforyou.myshopify.com';
	var url=`${location.origin}/apps/proxy?shop=${Shopify.shop}`; 
    loadMoreData(url);
}
function searchDelay() {
    debounceFunction(() => submitForm(), 500);
}
function pagination(argument) { 
    const url = new URL(argument);
    const urlParams = new URLSearchParams(url.search);
    const page = urlParams.get('page');
    var urls=`${location.origin}/apps/proxy?shop=${Shopify.shop}&page=${page}`; 
    loadMoreData(urls);
}
$(".form-control").keyup(function(event) {
  if(event.keyCode=='13'){
    if (event.target.value) {
      submitForm();
    }
  }
});
$(document).ready(function(){
   $("li > :checkbox").click(function(event){
    if(event.target.name == 'ex3' || event.target.name == 'ex3n') {
        searchDelay();
    } else {        
        submitForm();
    }
   });
});

 $(function () {
    $("#checkAlls").click(function () {
        if ($("#checkAlls").is(':checked')) {
            $(".tr_checkbox").prop("checked", true);
        } else {
            $(".tr_checkbox").prop("checked", false);
        }
    });
}); 
function checkInput(event) {
    /*var keycode = event.keyCode;
    if(keycode != 46 && keycode != 8 && keycode != 13 && keycode != 110 && (keycode < 48 || keycode > 57) && (keycode < 96 || keycode > 105)) {
        event.preventDefault();
    }*/
    var key = event.key;
    if(isNaN(key) && key != '.' && key != 'Enter' && key != 'Backspace' && key != 'Delete') {
        event.preventDefault();
        return false;
    }
    return true;
}

function inputValue(event,id,index,text) {
    if(checkInput(event)) {
        debounceFunction(() => inputValueDelay(id,index,text), 500);
    }
}
function inputValueDelay(id,index,text) {
    var from_val = $("#"+id+"_from").val();
    var to_val = $("#"+id+"_to").val();
    if(index && from_val.trim() == '') {
        from_val = 0;
        $("#"+id+"_from").val(0);
    }
    if(!index && to_val.trim() == '') {
        to_val = 100;
        $("#"+id+"_to").val(100);
    }

    if(parseFloat(from_val) > parseFloat(to_val)) {
        alertify.set('notifier','position', 'top-right');
        alertify.warning(text+' from can not be greater than '+text+' to ');

        $("#"+id+"_to").val(from_val);
        submitForm();
    } else if(parseFloat(from_val) >= 0 && parseFloat(to_val)) {
        submitForm();
    }
} 

function loadMoreData(url_data){ 
        const dia_view = localStorage.getItem('dia_view');
        var compare_session=$("#compare_session").val();
        var text_color="";
        var compare_title="Add To Compare";
        var per_page=$("#per_page").val();
        var value_form = $('#form').serialize()+'&'+$.param({ "per_page": per_page});
        localStorage.setItem('diamondForm', value_form);
        
        $.ajax({
            url: url_data,
            type: 'get',
            dataType: 'json',
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true'
            },            
            data: value_form,
            success: function(data){
                // console.log(data);
                var details=data.records;   
                var page_link=data.page_link; 
                var isLogin=data.isLogin;
                var total_records=data.total_records;

                var theme_json=data.theme_json; 
                var text_color=theme_json.text_color;
                var bg_color=theme_json.bg_color;
                var font_size=theme_json.font_size;
                var shop_name=theme_json.shop_name;

                localStorage.setItem('text_color', text_color);
                localStorage.setItem('bg_color', bg_color);
                localStorage.setItem('font_size', font_size+"px");
                
                $(".text_color").css("color", text_color);
                $(".font_size").css("font-size", font_size);
                // $("thead tr").css("background-color", bg_color);
                $(".tps_diamond_shapes li.active img").css("border-color", text_color);
                

                

                $(".font_size").css("color", font_size);
                // $(".bg_color").css("background-color", bg_color);

                $(".bg_color").css({
                    "background-color": bg_color,
                    "color": "#FFFFFF"
                  });
                
                var product_id=data.product_id;   
                var variants_id=data.variants_id;   
                if(product_id != "" && variants_id != ""){
                    $("#cartModal").modal('show');
                    const myTimeout = setTimeout(addToCart(product_id, variants_id), 5000);
                }                
                   
                $("#pagination-div-id").html(page_link);
                $('#pagination-div-id a').each(function () {
                    var a=$(this).attr("href");
                    $(this).attr("onclick",'pagination("'+a+'")');
                    $(this).attr("href","javascript:void(0)");
                }); 
                

                var html="";
                var details_length=details.length;
                for(i=0;i<details_length;i++)
                {      

                    // if(compare_session.search(details[i].diamond_id)>=0){
                    //     text_color="text-red";
                    //     compare_title="Remove From Compare"
                    // }else{
                    //     text_color="";
                    //     compare_title="Add To Compare";
                    // }

                    if(details[i].stock_id != null){ var stock_id=details[i].stock_id; }else{ var stock_id=""; }
                    if(details[i].shape != null){ var shape_full=details[i].shape; }else{ var shape_full=""; }
                    if(details[i].weight != null){ var weight=parseFloat(details[i].weight).toFixed(2); }else{ var weight=""; }
                    if(details[i].color != null){ var color=details[i].color; }else{ var color=""; }
                    if(details[i].grade != null){ var grade=details[i].grade; }else{ var grade=""; }
                    if(details[i].cut != null){ var cut=details[i].cut; }else{ var cut=""; }
                    if(details[i].polish != null){ var polish=details[i].polish; }else{ var polish=""; }
                    if(details[i].symmetry != null){ var symmetry=details[i].symmetry; }else{ var symmetry=""; }
                    if(details[i].fluorescence_int != null){ var fluorescence_int=details[i].fluorescence_int; }else{ var fluorescence_int=""; }
                    if(details[i].depth != null){ var depth=parseFloat(details[i].depth).toFixed(1); }else{ var depth=""; }
                    if(details[i].table_d != null){ var table_d=parseInt(details[i].table_d); }else{ var table_d=""; }
                    if(details[i].rapnet != null){ var rapnet=Math.round(details[i].rapnet); }else{ var rapnet=""; }
                    if(details[i].rapnet_discount != null){ var rapnet_discount=parseFloat(details[i].rapnet_discount).toFixed(1); }else{ var rapnet_discount=""; }
                    if(details[i].cost_carat != null){ var cost_carat=Math.round(details[i].cost_carat); }else{ var cost_carat=""; }
                    if(details[i].total_price != null){ var total_price=Math.round(details[i].total_price); }else{ var total_price=""; }
                    if(details[i].cash_price != null){ var cash_price=Math.round(details[i].cash_price); }else{ var cash_price=""; }
                    if(details[i].cash_price_discount != null){ var cash_price_discount=parseFloat(details[i].cash_price_discount).toFixed(1); }else{ var cash_price_discount=""; }
                    if(details[i].cash_cost_carat != null){ var cash_cost_carat=Math.round(details[i].cash_cost_carat); }else{ var cash_cost_carat=""; }
                    if(details[i].cash_total_price != null){ var cash_total_price=Math.round(details[i].cash_total_price); }else{ var cash_total_price=""; }
                    if(details[i].lab != null){ var lab=details[i].lab; }else{ var lab=""; }
                    if(details[i].report_no != null){ var report_no=details[i].report_no; }else{ var report_no=""; }
                    if(details[i].measurements != null){ var measurements=details[i].measurements; }else{ var measurements=""; }
                    if(details[i].member_comment != null){ var member_comment=details[i].member_comment; }else{ var member_comment=""; }
                    const diamond_image = details[i].diamond_image || '';
                    const diamond_video = details[i].diamond_video || '';
                    const diamond_id = details[i].diamond_id;
                    
                    if(dia_view == 'view_as_list') {                        

                        html +='<tr style="" id="tr_'+details[i].diamond_id+'">';
                        html +='    <td>';
                        html +='      <input type="checkbox" name="checkbox_record[]" value="'+details[i].diamond_id+'" class="tr_checkbox pull-left" >';
                        html +='    </td>';
                        html +='    <td> ';
                        html +=`      <a href="javascript:void(0)"  onclick="addToCartDiamond('${stock_id}','${shop_name}')" ><i class="fa fa-cart-plus " style="color: ${bg_color};" title="Add to Cart" id="" data-toggle="tooltip" ></i></a>`;
                        html +=`<i id="i_${diamond_id}" class="fa fa-search-plus " style="color: ${bg_color};"  title="View details" data-toggle="tooltip" onclick="quickDetail(${details[i].diamond_id} , {diamond_id: ${details[i].diamond_id}, availability: '${details[i].availability}', cash_price: '${details[i].cash_price}', city: '${details[i].city}', color: '${details[i].color}', country: '${details[i].country}', crown_angle: '${details[i].crown_angle}', crown_ht: '${details[i].crown_ht}', culet: '${details[i].culet}', culet_con: '${details[i].culet_con}', culet_size: '${details[i].culet_size}', cut: '${details[i].cut}', depth: '${details[i].depth}', diamond_image: '${details[i].diamond_image}', diamond_type: '${details[i].diamond_type}', diamond_video: '${details[i].diamond_video}', fluorescence_color: '${details[i].fluorescence_color}', fluorescence_int: '${details[i].fluorescence_int}', girdle: '${details[i].girdle}', girdle_con: '${details[i].girdle_con}', girdle_perct: '${details[i].girdle_perct}', girdle_thick: '${details[i].girdle_thick}', girdle_thin: '${details[i].girdle_thin}', grade: '${details[i].grade}', insp: '${details[i].insp}', is_match_pair_sep: '${details[i].is_match_pair_sep}', keytosymb: '${details[i].keytosymb}', lab: '${details[i].lab}', lab_location: '${details[i].lab_location}', m_depth: '${details[i].m_depth}', m_length: '${details[i].m_length}', m_width: '${details[i].m_width}', measurements: '${details[i].measurements}', member_comment: '${details[i].member_comment}', milky: '${details[i].milky}', notes: '${details[i].notes}', open_inclusion: '${details[i].open_inclusion}', pavillion_angle: '${details[i].pavillion_angle}', pavillion_depth: '${details[i].pavillion_depth}', polish: '${details[i].polish}', rapnet: '${details[i].rapnet}', rapnet_discount: '${details[i].rapnet_discount}', report_filename: '${details[i].report_filename}', report_no: '${details[i].report_no}', report_type: '${details[i].report_type}', shade: '${details[i].shade}', shape: '${details[i].shape}', star_len: '${details[i].star_len}', state: '${details[i].state}', stock_id: '${details[i].stock_id}', symmetry: '${details[i].symmetry}', table_d: '${details[i].table_d}', vendor_id: '${details[i].vendor_id}', weight: '${details[i].weight}'}, '${details[i]}' )"></i>`;
                        html +='    </td>';
                        html +='    <td class="text-uppercase">'+stock_id+'</td>';
                        html +='    <td class="text-uppercase">'+shape_full+'</td>';
                        html +='    <td>'+weight+'</td>';
                        html +='    <td>'+color+'</td>';
                        html +='    <td>'+grade+'</td>';
                        html +='    <td>'+cut+'</td>';
                        html +='    <td>'+polish+'</td>';
                        html +='    <td>'+symmetry+'</td>';
                        html +='    <td>'+fluorescence_int+'</td>';
                        html +='    <td>'+depth+'</td>';
                        html +='    <td>'+table_d+'</td>';
                        html +='    <td>$'+cash_price+'</td> ';   
                        if(report_no) {
                            html +='    <td><a href="https://vd-v360.s3.ap-south-1.amazonaws.com/cert/'+report_no+'.pdf" target="_blank">'+lab+'</a></td>';                    
                        } else {
                            html +='    <td>'+lab+'</td>';                    
                        }
                        html +='    <td>'+measurements+'</td>';                 
                        html +='</tr>';
                    } 
                    else if(dia_view == 'view_as_grid') {

                        html +=`<div class="dia_box">
                                <div class="dia_btn">
                                    <input type="checkbox" name="checkbox_record[]" value="${diamond_id}" class="tr_checkbox pull-left" >`;
                            html +=`
                            <a href="javascript:void(0)" onclick="addToCartDiamond('${stock_id}','${shop_name}')" ><i class="fa fa-cart-plus " style="color: ${bg_color};" title="Add to Cart" id="" data-toggle="tooltip" ></i></a>
                                    <i id="i_${diamond_id}" class="fa fa-search-plus " style="color: ${bg_color};"  title="View details" data-toggle="tooltip" onclick="quickDetail(${details[i].diamond_id} , {diamond_id: ${details[i].diamond_id}, availability: '${details[i].availability}', cash_price: '${details[i].cash_price}', city: '${details[i].city}', color: '${details[i].color}', country: '${details[i].country}', crown_angle: '${details[i].crown_angle}', crown_ht: '${details[i].crown_ht}', culet: '${details[i].culet}', culet_con: '${details[i].culet_con}', culet_size: '${details[i].culet_size}', cut: '${details[i].cut}', depth: '${details[i].depth}', diamond_image: '${details[i].diamond_image}', diamond_type: '${details[i].diamond_type}', diamond_video: '${details[i].diamond_video}', fluorescence_color: '${details[i].fluorescence_color}', fluorescence_int: '${details[i].fluorescence_int}', girdle: '${details[i].girdle}', girdle_con: '${details[i].girdle_con}', girdle_perct: '${details[i].girdle_perct}', girdle_thick: '${details[i].girdle_thick}', girdle_thin: '${details[i].girdle_thin}', grade: '${details[i].grade}', insp: '${details[i].insp}', is_match_pair_sep: '${details[i].is_match_pair_sep}', keytosymb: '${details[i].keytosymb}', lab: '${details[i].lab}', lab_location: '${details[i].lab_location}', m_depth: '${details[i].m_depth}', m_length: '${details[i].m_length}', m_width: '${details[i].m_width}', measurements: '${details[i].measurements}', member_comment: '${details[i].member_comment}', milky: '${details[i].milky}', notes: '${details[i].notes}', open_inclusion: '${details[i].open_inclusion}', pavillion_angle: '${details[i].pavillion_angle}', pavillion_depth: '${details[i].pavillion_depth}', polish: '${details[i].polish}', rapnet: '${details[i].rapnet}', rapnet_discount: '${details[i].rapnet_discount}', report_filename: '${details[i].report_filename}', report_no: '${details[i].report_no}', report_type: '${details[i].report_type}', shade: '${details[i].shade}', shape: '${details[i].shape}', star_len: '${details[i].star_len}', state: '${details[i].state}', stock_id: '${details[i].stock_id}', symmetry: '${details[i].symmetry}', table_d: '${details[i].table_d}', vendor_id: '${details[i].vendor_id}', weight: '${details[i].weight}'}, '${details[i]}' )"></i>
                                </div>
                                <div class="dia_img"><img src="${diamond_image}" onerror="imgError(this)"></div>
                                <div class="dia_details">
                                    <span class="dia_shape">${shape_full}, ${weight}, ${color}, ${grade}</span>
                                    <span>${cut}, ${polish}, ${symmetry}, ${fluorescence_int}</span>
                                    <span class="dia_lab">`;
                                   
                                    if(report_no) {
                                        html +=`<a href="https://vd-v360.s3.ap-south-1.amazonaws.com/cert/${report_no}.pdf" target="_blank">${lab}</a></td>`;                    
                                    } else {
                                        html +=` ${lab} `;                    
                                    }
                                html +=`    </span>`;
                                if(isLogin) {  
                                    html +=`<span class="dia_price">$${cash_price}</span>`;
                                } else {
                                    html += `<span class="dia_price">*****</span>`;
                                }
                        html +=`</div>
                        </div>`;
                    }

                }

                
                if(dia_view == 'view_as_list') {
                    $(".fa-th").css("background-color",'')
                    $(".fa-list").css("background-color",bg_color)

                    $("#grid_diamond").hide();
                    $("#grid_diamond").html('');
                    $("#list_diamond").show();
                    $('#example').dataTable().fnDestroy();
                    $("#add_data").html(html);
                    
                } else if(dia_view == 'view_as_grid') {
                    $(".fa-th").css("background-color",bg_color)
                    $(".fa-list").css("background-color",'')

                    $("#list_diamond").hide();
                    $("#add_data").html('');
                    $("#grid_diamond").show();
                    $("#grid_diamond").html(html);                    
                }
                
                $("#total_records").html(total_records);
            },
            beforeSend: function () {
                $(".header").removeClass('sorted');
                $("#page-loader").show();
            },
            complete: function () {
                if(dia_view == 'view_as_list') {
                    var table = $('#example').DataTable({     
                        "retrieve": true,
                        "autoWidth": false,               
                        // "scrollY": 800,   
                        // "scrollX": true,
                        "scrollY": false,
                        "scrollX": false,
                        "ordering": false,
                        "paging": false,
                        "searching": false,
                        "info": false,
                        "order": []                                   
                    }); 
                }

                $("#page-loader").fadeOut();
                $('[data-toggle="tooltip"]').tooltip({'placement':'top'}); 
            }    

        });
}

// -----Add to cart start--------
function addToCartDiamond(stock_id, store_name){ 
    var url=`${location.origin}/apps/proxy?shop=${Shopify.shop}&stock_id=${stock_id}&store_name=${store_name}`;
    loadMoreData(url); 
}

function addToCart(id, selectedVariantId) {
    
        const formData = {
          items: [{
            id: selectedVariantId,
            quantity: 1
          }]
        };
      
        const apiUrl = window.Shopify.routes.root + 'cart/add.js';
      
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        };
      
        fetch(apiUrl, requestOptions)
          .then(res => handleResponse(res, id, selectedVariantId))
          .catch(handleError)
}

// -----Add to cart end--------
function handleResponse(res, id, selectedVariantId) {
      return res.json().then(data => {
        if(data?.items) {
        //   alert('Item added to cart');
    
          findify.core.analytics.sendEvent('click-item',
            {
                rid: findify.grid.state.meta.rid,
                item_id: id,
                variant_item_id: selectedVariantId
            },
            false
          )
        }
        else {
          const errorDescription = data?.description || 'Unexpected Error';
          alert(errorDescription);
        }
      })
}
    
function handleError(error) {
    const errorDescription = error?.description || 'Unexpected Error';
    //   alert(errorDescription);
}
// -----Add to cart end--------

function imgError(e) {
   e.src = 'https://cdn.shopify.com/s/files/1/0697/1742/6414/files/No_image.jpg?v=1718975816';
}

function quickDetail(id,jsonData, str){ 
        var details =  Array(jsonData);
        // console.log(details);

        const dia_view = localStorage.getItem('dia_view');
        if($("#i_"+id).hasClass("fa-search-plus"))
        {   
                    if(dia_view == 'view_as_list') { 
                        $("#i_"+id).removeClass("fa-search-plus").addClass("fa-search-minus");
                    }
                    var html = "";
                    var details_length = details.length;
                    console.log(details_length);
                    for(i = 0; i < details_length; i++)
                    {       
                        const weight = (details[i].weight != null) ? parseFloat(details[i].weight).toFixed(2) : '';
                        const depth = (details[i].depth != null) ? parseFloat(details[i].depth).toFixed(1) : '';
                        const table_d = (details[i].table_d != null) ? parseInt(details[i].table_d) : '';
                        const diamond_id = details[i].diamond_id;
                        const stock_id = details[i].stock_id;
                        const shape_full = details[i].shape || '';
                        const color = details[i].color || ''
                        const grade = details[i].grade || '';
                        const cut_full = details[i].cut || '';
                        const polish_full = details[i].polish || '';
                        const symmetry_full = details[i].symmetry || '';
                        const fluor_full = details[i].fluorescence_int || '';
                        const lab = details[i].lab || '';
                        const report_no = details[i].report_no || '';
                        const measurements = details[i].measurements || '';
                        const member_comment = details[i].member_comment || '';
                        const girdle_thin = details[i].girdle_thin || '';
                        const girdle_thick = details[i].girdle_thick || '';
                        const culet_size = details[i].culet_size || '';
                        const crown_angle = details[i].crown_angle || '';
                        const crown_ht = details[i].crown_ht || '';
                        const pavillion_angle = details[i].pavillion_angle || '';
                        const pavillion_depth = details[i].pavillion_depth || '';
                        const keytosymb = details[i].keytosymb || '';
                        const diamond_image = details[i].diamond_image || '';
                        const cash_price = details[i].cash_price || '';
                        
                        var html = '';
                        html += '<tr id="tr_ic_'+diamond_id+'" class="tr-detail" >';       
                        html += '   <td colspan="23" style="border: 1px solid #bcbcbc;width:100%">';
                        html += '       <div class="t-row" style="padding: 10px;width: 300px;height: 300px;">';
                        html += '            <a class="ThumbnailImg" href="'+diamond_image+'" target="_blank">';
                        html += '                <img src="'+diamond_image+'" onerror="imgError(this)" title="Image" style="cursor:pointer;">';
                        html += '            </a>';        
                        html += '       </div>';
                        
                        html += '       <div class="t-row">';
                        html += '           <div class="t-li"><span class="head bg_color">Stock#</span><span>'+stock_id+'</span></div>';
                        html += '           <div class="t-li"><span class="head bg_color">Shape</span><span>'+shape_full+'</span></div>';
                        html += '           <div class="t-li"><span class="head bg_color">Cts</span><span>'+weight+'</span></div>';
                        html += '           <div class="t-li"><span class="head bg_color">Color</span><span>'+color+'</span></div>';
                        html += '           <div class="t-li"><span class="head bg_color">Clarity</span><span>'+grade+'</span></div>';
                        html += '           <div class="t-li"><span class="head bg_color">Cut</span><span>'+cut_full+'</span></div>';
                        html += '           <div class="t-li"><span class="head bg_color">Pol</span><span>'+polish_full+'</span></div>';
                        html += '           <div class="t-li"><span class="head bg_color">Sym</span><span>'+symmetry_full+'</span></div>';
                        html += '           <div class="t-li"><span class="head bg_color">Report No</span><span>'+report_no+'</span></div>';
                        html += '           <div class="t-li"><span class="head bg_color">Flour</span><span>'+fluor_full+'</span></div>';

                        html += '       </div>';
                        
                        // html += '       <div class="t-row">';        
                        // // html += '           <div class="t-li"><span class="head bg_color">Report No</span><span>'+report_no+'</span></div>';
                        // // html += '           <div class="t-li"><span class="head bg_color">Flour</span><span>'+fluor_full+'</span></div>';
                        // // html += '           <div class="t-li"><span class="head bg_color">COD Disc %</span><span>'+cash_price_discount+'</span></div>';
                        // // html += '           <div class="t-li"><span class="head bg_color">COD Price/Ct</span><span>'+cash_price+'</span></div>';
                        // // html += '           <div class="t-li"><span class="head bg_color">Total COD $</span><span>'+cash_total_price+'</span></div>';
                        // // html += '           <div class="t-li"><span class="head bg_color">Memo Disc %</span><span>'+rapnet_discount+'</span></div>';
                        // // html += '           <div class="t-li"><span class="head bg_color">Memo Price/Ct</span><span>'+cost_carat+'</span></div>';
                        // // html += '           <div class="t-li"><span class="head bg_color">Memo Total $</span><span>'+total_price+'</span></div>';
                        // html += '       </div>';
                        
                        html += '       <div class="t-row">';
                        html += '           <div class="t-li"><span class="head bg_color">Lab</span><span class="Lab">';
                        if(report_no) {
                            html +='    <a href="https://vd-v360.s3.ap-south-1.amazonaws.com/cert/'+report_no+'.pdf" target="_blank">'+lab+'</a>';                    
                        } else {
                            html +='    '+lab+'';                    
                        }
                        html += '</span></div>';
                        html += '           <div class="t-li"><span class="head bg_color">Price</span><span>'+cash_price+'</span></div>';
                        html += '           <div class="t-li"><span class="head bg_color">Depth%</span><span>'+depth+'</span></div>';
                        html += '           <div class="t-li"><span class="head bg_color">Table%</span><span>'+table_d+'</span></div>';
                        html += '           <div class="t-li"><span class="head bg_color">Culet</span><span>'+culet_size+'</span></div>';
                        html += '          <div class="t-li"><span class="head bg_color">Crown Angle</span><span>'+crown_angle+'</span></div>';
                        html += '          <div class="t-li"><span class="head bg_color">Crown Height</span><span>'+crown_ht+'</span></div>';
                        html += '          <div class="t-li"><span class="head bg_color">Pavillion Angle</span><span>'+pavillion_angle+'</span></div>';
                        html += '          <div class="t-li"><span class="head bg_color">Pavillion Height</span><span>'+pavillion_depth+'</span></div>';       
                        html += '       </div>';
                        html += '       <div class="t-row comment">';
                        html += '          <div class="t-li"><span class="head bg_color">Key to Symbols</span><span>'+keytosymb+'</span></div>';                    
                        html += '          <div class="t-li"><span class="head bg_color">Comments</span><span>'+member_comment+'</span></div>';
                        html += '       </div>';
                        html += '       <div class="t-row buttons">';
                        // html +='          <a href="'+details[i].stock_id+'diamond-details/'+details[i].stock_id+'" class="btn btn-info" target="_blank">More Info</a>';
                        if(details[i].diamond_video != null && details[i].diamond_video != ''){
                            html +='      <a href="'+details[i].diamond_video+'" class="btn bg_color" target="_blank">Video</a>';
                        }
                        html += '       </div>';

                        html += '  </td>';
                        html += '</tr>';    

                    }
                    if(dia_view == 'view_as_list') {                       
                        $("#tr_"+id).after(html);
                    } else if(dia_view == 'view_as_grid') {
                        // console.log(dia_view);
                        $("#quick_detail_tbody").html(html);
                        $("#quick_detail_modal").modal('show');
                    }
                    var bg_color = localStorage.getItem('bg_color');
                    $(".bg_color").css("background-color", bg_color)
        }else{
            if(dia_view == 'view_as_list') {
                $("#i_"+id).removeClass("fa-search-minus").addClass("fa-search-plus");
                $("#tr_ic_"+id).remove();  
            }          
        }

}

