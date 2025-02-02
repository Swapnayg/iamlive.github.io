
var firstGame = null;

$(document).ready(function(){
    var modal = document.getElementById("myModal_k3");
    modal.style.display = "none";
    callAjaxMeJoin();
  });
socket.on("data-server-k3", function (msg) {
    if (msg) {
        let checkData = $('html').attr('data-dpr');
        if (checkData == msg.game) {
            pageno = 0;
            limit = 10;
            page = 1;
            let notResult = msg.data[0];
            let Result = msg.data[1];
            let check = $('#number_result').attr('data-select');
            console.log(check);
            if (check == 'all') {
                reload_money();
                callListOrder();
                RenderResult(Result.result);
            } else {
                reload_money();
                callAjaxMeJoin();
                RenderResult(Result.result);
            }
            $('#period').text(notResult.period);
            $("#previous").addClass("block-click");
            $("#previous").removeClass("action");
            $("#previous .van-icon-arrow").css("color", "#7f7f7f");
            $("#next").removeClass("block-click");
            $("#next").addClass("action");
            $("#next .van-icon-arrow").css("color", "#fff");
            $('.container1').click();
        }
    }
});

function isNumber(params) {
    let pattern = /^[0-9]*\d$/;
    return pattern.test(params);
}

function ShowListOrder(list_orders) {
    if (list_orders.length == 0) {
        return $(`#list_order`).html(
            `
            <div data-v-a9660e98="" class="van-empty">
                <div class="van-empty__image">
                    <img src="/images/empty-image-default.png" />
                </div>
                <p class="van-empty__description">No data</p>
            </div>
            `
        );
    }
    let htmls = "";
    let result = list_orders.map((list_orders) => {
        let total = String(list_orders.result).split('');
        let total2 = 0;
        for (let i = 0; i < total.length; i++) {
            total2 += Number(total[i]);
        }

        let html2 = '';
        for (let i = 0; i < total.length; i++) {
            html2 += `
                <div data-v-03b808c2="" class="li img${total[i]}"></div>
            `;
        }

        return (htmls += `
            <div data-v-03b808c2="" class="c-tc item van-row">
                <div data-v-03b808c2="" class="van-col van-col--6">
                    <div data-v-03b808c2="" class="c-tc goItem lh">${list_orders.period}</div>
                </div>
                <div data-v-03b808c2="" class="van-col van-col--4">
                    <div data-v-03b808c2="" class="c-tc goItem lh"> ${total2} </div>
                </div>
                <div data-v-03b808c2="" class="van-col van-col--5">
                    <div data-v-03b808c2="" class="c-tc goItem lh">
                        <div data-v-03b808c2="">${(total2 >= 3 && total2 <= 10) ? "Small" : "Big"}</div>
                    </div>
                </div>
                <div data-v-03b808c2="" class="van-col van-col--4">
                    <div data-v-03b808c2="" class="c-tc goItem lh">
                        <div data-v-03b808c2="">${(total2 % 2 == 0) ? "Even" : "Odd"}</div>
                    </div>
                </div>
                <div data-v-03b808c2="" class="van-col van-col--5">
                    <div data-v-03b808c2="" class="goItem c-row c-tc c-row-between c-row-middle">
                        ${html2}
                    </div>
                </div>
            </div>
        `);
    });
    $('#kd_submit').addClass('confirm');
    $(`#list_order`).html(htmls);
}

function formateT(params) {
    let result = (params < 10) ? "0" + params : params;
    return result;
}

function timerJoin(params = '') {
    let date = '';
    if (params) {
        date = new Date(Number(params));
    } else {
        date = new Date();
    }
    let years = formateT(date.getFullYear());
    let months = formateT(date.getMonth() + 1);
    let days = formateT(date.getDate());

    let hours = formateT(date.getHours());
    let minutes = formateT(date.getMinutes());
    let seconds = formateT(date.getSeconds());
    return years + '-' + months + '-' + days + ' ' + hours + ':' + minutes + ':' + seconds;
}

function GetMyEmerdList(list_orders) {
    if (list_orders.length == 0) {
        return $(`#list_order`).html(
            `
            <div data-v-a9660e98="" class="van-empty">
                <div class="van-empty__image">
                    <img src="/images/empty-image-default.png" />
                </div>
                <p class="van-empty__description">No Data</p>
            </div>
            `
        );
    }
    let htmls = "";
    let result = list_orders.map((list_order) => {
        let arr = list_order.result.split('');
        let resultData = ``;
        let total = 0;

        for (let i = 0; i < arr.length; i++) {
            total += Number(arr[i]);
            resultData += `
          <div data-v-42f27458="" class="li circle-black">${arr[i]}</div>
        `;
        }

        let join = '';
        let arr2 = list_order.bet.replace(/[$@%]/g, '').split(',');
        for (let i = 0; i < arr2.length; i++) {
                let check = isNumber(arr2[i].replace("y",""));
            if (check) {
                join += `
          <div data-v-42f27458="" class="my_bet_choose">
              <span data-v-42f27458="" style="color: rgb(0, 0, 0);">
                <span data-v-42f27458="" class="li circle-black" style="color: rgb(0, 0, 0);">${arr2[i].replace("y","")}</span>  
              </span>
          </div>`;
            } else {
                join += `
          <div data-v-42f27458="" class="my_bet_choose">
            <span data-v-42f27458="" style="color: rgb(0, 0, 0);">${(arr2[i] == 'c') ? "Even" : (arr2[i] == 'l') ? 'Odd' : (arr2[i] == 'b') ? 'Big' : 'Small'}</span>
          </div>
          `;
            }
        }
        return (htmls += `
            <div data-v-03b808c2="" class="k3_bet_list">
                <div data-v-03b808c2="" class="k3_item item c-row">
                    <div data-v-03b808c2="" class="c-row c-row-between c-row-middle info">
                        <div data-v-03b808c2="">
                            <div data-v-03b808c2="" class="issueName">
                                ${list_order.stage}
                                <!---->
                                <span data-v-03b808c2="" class="state ${(list_order.status == 1) ? 'green' : 'red'} ${(list_order.status == 0) ? 'd-none' : ''}">${(list_order.status == 1) ? 'Success' : 'Failure'}</span>
                            </div>
                            <div data-v-03b808c2="" class="tiem">${timerJoin(list_order.time)}</div>
                        </div>
                        <div data-v-03b808c2="" class="money ${(list_order.status == 0) ? 'd-none' : ''}">
                            <!---->
                            <span data-v-03b808c2="" class="${(list_order.status == 1) ? 'success' : 'fail'}"> ${(list_order.status == 1) ? '+' : '-'}${(list_order.status == 1) ? list_order.get : list_order.price}.00 </span>
                        </div>
                    </div>
                    
                </div>
                <!---->
                        <div data-v-42f27458="" class="details display-none" >
   <div data-v-42f27458="" class="tit">Details</div>
   <div data-v-42f27458="" class="detailLi c-row c-row-between c-row-middle">
      <div data-v-42f27458="">Order Number</div>
      <div data-v-42f27458="" class="tag-read c-row c-row-between c-row-middle">
      ${list_order.id_product}
         <img data-v-42f27458="" data-clipboard-text="${list_order.id_product}" width="18px" height="15px" src="/images/copy.png" class="m-l-5 copy-to-img" />
      </div>
   </div>
   <div data-v-42f27458="" class="detailLi c-row c-row-between c-row-middle">
      <div data-v-42f27458="">Periods</div>
      <div data-v-42f27458="">${list_order.stage}</div>
   </div>
   <div data-v-42f27458="" class="detailLi c-row c-row-between c-row-middle">
      <div data-v-42f27458="">Spent Amount</div>
      <div data-v-42f27458="">${list_order.money}.00</div>
   </div>
   <div data-v-42f27458="" class="detailLi c-row c-row-between c-row-middle">
      <div data-v-42f27458="">Quantity Purchased</div>
      <div data-v-42f27458="">${list_order.amount}</div>
   </div>
   <div data-v-42f27458="" class="detailLi c-row c-row-between c-row-middle">
      <div data-v-42f27458="">After Tax Amount</div>
      <div data-v-42f27458="" class="red">${list_order.price}.00</div>
   </div>
   <div data-v-42f27458="" class="detailLi c-row c-row-between c-row-middle">
      <div data-v-42f27458="">Tax</div>
      <div data-v-42f27458="">${list_order.fee}.00</div>
   </div>
   <div data-v-42f27458="" class="detailLi c-row c-row-between c-row-middle">
      <div data-v-42f27458="">Opening Price</div>
      <div data-v-42f27458="" style="display: ${(list_order.status == 0) ? 'none' : ''};">${list_order.result}</div>
   </div>
   <div data-v-42f27458="" class="detailLi c-row c-row-between c-row-middle">
      <div data-v-42f27458="">Results</div>
      <div data-v-42f27458="" class="c-row" style="display: ${(list_order.status == 0) ? 'none' : ''};">
      ${resultData}
      </div>
   </div>
   <div data-v-42f27458="" class="detailLi c-row c-row-between c-row-middle">
      <div data-v-42f27458="">Choose</div>
      <div data-v-42f27458="" class="c-row c-row-middle">
         <div data-v-42f27458="" class="c-row m-r-5">
            <div data-v-42f27458="">${(list_order.join_bet == 'total') ? "SUM" : list_order.join_bet.toUpperCase()}</div>
         </div>
          ${join}
      </div>
   </div>
   <div data-v-42f27458="" class="detailLi c-row c-row-between c-row-middle">
      <div data-v-42f27458="">Status</div>
      <div data-v-42f27458="" class="${(list_order.status == 1) ? 'green' : 'red'}" style="display: ${(list_order.status == 0) ? 'none' : ''};">${(list_order.status == 1) ? 'Success' : 'Fail'}</div>
                  <!---->
   </div>
   <div data-v-42f27458="" class="detailLi c-row c-row-between c-row-middle">
      <div data-v-42f27458="">Win Or Loss</div>
      <div data-v-42f27458="" class="${(list_order.status == 1) ? 'green' : 'red'}" style="display: ${(list_order.status == 0) ? 'none' : ''};">${(list_order.status == 1) ? '+' : '-'} ${(list_order.status == 1) ? list_order.get : list_order.price}.00</div>
                  <!---->
   </div>
   <div data-v-42f27458="" class="detailLi c-row c-row-between c-row-middle">
      <div data-v-42f27458="">Purchase Time</div>
      <div data-v-42f27458="">${timerJoin(list_order.time)}</div>
   </div>
</div>  
            </div>

        `);
    });
    $(`#list_order`).html(htmls);
}

function callListOrder() {
    $.ajax({
        type: "POST",
        url: "/api/webapi/k3/GetNoaverageEmerdList",
        data: {
            gameJoin: $('html').attr('data-dpr'),
            pageno: "0",
            pageto: "10",
        },
        dataType: "json",
        success: function (response) {
            let list_orders = response.data.gameslist;
            $("#period").text(response.period);
            $("#number_result").text("1/" + response.page);
            if (firstGame && firstGame.stage == list_orders[0].period) {
                var modal = document.getElementById("myModal_k3");
                modal.style.display = "block";
                var myModalheader = document.getElementById("myModal_header");
                var myModal_result = document.getElementById("myModal_result");
                var lottery_result = document.getElementById("lottery_result");
                var myModal_result_Period = document.getElementById("myModal_result_Period");
                if (firstGame.get == 0) {
                    myModalheader.innerHTML = "Try Again";
                    myModal_result.innerHTML = "LOSS :" + firstGame.money;
                } else {
                    myModalheader.innerHTML = "congratulations";
                    myModal_result.innerHTML = "WIN :" + firstGame.get;
                }
                myModal_result_Period.innerHTML = "Period :K "+$('html').attr('data-dpr')+"min " + firstGame.stage;
                var count1=0;
                var a_result1 = list_orders[0].result.toString().split("");
                var dice_txt = '';
                for (var i=a_result1.length; i--;) {
                  count1+= parseInt(a_result1[i]);
                  dice_txt += '<div data-v-2d418cc5="" class="n'+(i+1)+'"></div>,'
                }
                $("#modal_dice").html(dice_txt.slice(0,-1));
                let color;
                let type;
        
                if (count1 >= 0 && count1 <= 4) {
                    type = "S";
                } else if (count1 >= 5 && count1 <= 9) {
                    type = "B";
                }
                if (count1 % 2 == 0) {
                    color = "Even";
                } else {
                    color = "Odd";
                }
                $("#modal_sum").html(count1);
                $("#modal_bsmll").html(type);
                $("#modal_oddev").html(color);
                //lottery_result.innerHTML = "Lottery Result:<span class='btn-boox'>" + color + "</span><span class='btn-boox'>" + firstGame.result + "</span><span class='btn-boox'>" + type + "</span>";
            }
            ShowListOrder(list_orders);
            $('.Loading').fadeOut(0);
            let result = String(list_orders[0].result).split('');
            $('.slot-transform:eq(0) .slot-num').attr('class', `slot-num bg${result[0]}`);
            $('.slot-transform:eq(1) .slot-num').attr('class', `slot-num bg${result[1]}`);
            $('.slot-transform:eq(2) .slot-num').attr('class', `slot-num bg${result[2]}`);
        },
    });
}

callListOrder();

function callAjaxMeJoin() {
    $.ajax({
        type: "POST",
        url: "/api/webapi/k3/GetMyEmerdList",
        data: {
            gameJoin: $('html').attr('data-dpr'),
            pageno: "0",
            pageto: "10",
        },
        dataType: "json",
        success: function (response) {
            let data = response.data.gameslist;
            $("#number_result").text("1/" + response.page);
            // Set the value of firstGame to the first game in the gameslist
            firstGame = data[0];
            console.log(firstGame);
            GetMyEmerdList(data);
            $('.Loading').fadeOut(0);
        },
    });
}




$('#history').click(function (e) { 
    e.preventDefault();
    callListOrder();
    $('.header-history').removeClass('d-none');
    $(this).addClass('block-click action');
    $('#myBet').removeClass('block-click action');
    $('#number_result').attr('data-select', 'all');
    pageno = 0;
    limit = 10;
    page = 1;
    $("#next").removeClass("block-click");
    $("#next").addClass("action");
    $("#next .van-icon-arrow").css("color", "#fff");
    $("#previous").addClass("block-click");
    $("#previous").removeClass("action");
    $("#previous .van-icon-arrow-left").css("color", "#7f7f7f");
});

$('#myBet').click(function (e) { 
    e.preventDefault();
    callAjaxMeJoin();
    $('.header-history').addClass('d-none');
    $(this).addClass('block-click action');
    $('#history').removeClass('block-click action');
    $('#number_result').attr('data-select', 'mybet');
    pageno = 0;
    limit = 10;
    page = 1;
    $("#next").removeClass("block-click");
    $("#next").addClass("action");
    $("#next .van-icon-arrow").css("color", "#fff");
    $("#previous").addClass("block-click");
    $("#previous").removeClass("action");
    $("#previous .van-icon-arrow-left").css("color", "#7f7f7f");
});


var pageno = 0;
var limit = 10;
var page = 1;
$("#next").click(function (e) {
    e.preventDefault();
    let check = $('#number_result').attr('data-select');
    $('.Loading').fadeIn(0);
    $("#previous").removeClass("block-click");
    $("#previous").addClass("action");
    $("#previous .van-icon-arrow-left").css("color", "#fff");
    pageno += 10;
    let pageto = limit;
    let url = '';
    if (check == 'all') {
        url = "/api/webapi/k3/GetNoaverageEmerdList";
    } else {
        url = "/api/webapi/k3/GetMyEmerdList";
    }
    $.ajax({
        type: "POST",
        url: url,
        data: {
            gameJoin: $('html').attr('data-dpr'),
            pageno: pageno,
            pageto: pageto,
        },
        dataType: "json",
        success: async function (response) {
            $('.Loading').fadeOut(0);
            if (response.status === false) {
                pageno -= 10;
                $("#next").addClass("block-click");
                $("#next").removeClass("action");
                $("#next .van-icon-arrow").css("color", "#7f7f7f");
                alertMess(response.msg);
                return false;
            }
            let list_orders = response.data.gameslist;
            $("#period").text(response.period);
            $("#number_result").text(++page + "/" + response.page);
            if (check == 'all') {
                ShowListOrder(list_orders);
            } else {
                GetMyEmerdList(list_orders);
            }
        },
    });
});
$("#previous").click(function (e) {
    e.preventDefault();
    let check = $('#number_result').attr('data-select');
    $('.Loading').fadeIn(0);
    $("#next").removeClass("block-click");
    $("#next").addClass("action");
    $("#next .van-icon-arrow").css("color", "#fff");
    pageno -= 10;
    let pageto = limit;
    let url = '';
    if (check == 'all') {
        url = "/api/webapi/k3/GetNoaverageEmerdList";
    } else {
        url = "/api/webapi/k3/GetMyEmerdList";
    }
    $.ajax({
        type: "POST",
        url: url,
        data: {
            gameJoin: $('html').attr('data-dpr'),
            pageno: pageno,
            pageto: pageto,
        },
        dataType: "json",
        success: async function (response) {
            $('.Loading').fadeOut(0);
            if (page - 1 < 2) {
                $("#previous").addClass("block-click");
                $("#previous").removeClass("action");
                $("#previous .van-icon-arrow-left").css("color", "#7f7f7f");
            }
            if (response.status === false) {
                pageno = 0;
                $("#previous .arr:eq(0)").addClass("block-click");
                $("#previous .arr:eq(0)").removeClass("action");
                $("#previous .van-icon-arrow-left").css("color", "#7f7f7f");
                alertMess(response.msg);
                return false;
            }
            let list_orders = response.data.gameslist;
            $("#period").text(response.period);
            $("#number_result").text(--page + "/" + response.page);
            if (check == 'all') {
                ShowListOrder(list_orders);
            } else {
                GetMyEmerdList(list_orders);
            }
        },
    });
});





$(document).on('click', '#list_order .k3_bet_list', function(e)
{
    e.preventDefault();
    $(this).find('.details').toggleClass("display-none");
});