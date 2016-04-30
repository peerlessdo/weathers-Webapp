

var urlCity = "https://api.heweather.com/x3/weather?city=wuhan&key=ead00e8e8c2540c9a87af54bb35002cf";;
var _strCity = {};

/*页面一*/
$(document).on("pagebeforeshow", "#page1", function(){
	var flag=1;
	ajax(1, urlCity);
	$(".select").on("click", function(event){
		if (flag) {
			$(".selectDown").css("display", "block");
			flag=0;
		}
		else{
			$(".selectDown").css("display", "none");
			flag=1;
		}
		return false;
	});
	$(document).on("click", function(){
		$(".selectDown").css("display", "none");
		flag=1;
	});
	$(".refresh").on("tap", function(){
		window.location.reload();
		//ajax(1, urlCity);
	});

});


/*页面二*/
$(document).on("pagebeforeshow", "#page2", function(){
	ajax(2, urlCity);
});


/*页面三*/
$(document).on("pagebeforeshow", "#page3", function(){
	ajax(3, urlCity);
	getLoc();
});


/*页面四*/
$(document).on('pagebeforeshow', '#page4', function(){
	$("#search-sub").on("click", function(){
		var city=$("#search").val();
		var apiStatus="";
		//alert(city);
		if (city=="") {
			alert("您咋能不输入就查询呢！");
			return false;
		}
		else{
			urlCity = "https://api.heweather.com/x3/weather?city=" + city + "&key=ead00e8e8c2540c9a87af54bb35002cf";
			if(window.XMLHttpRequest){
				var oAjax=new XMLHttpRequest;
			}
			else{
				var oAjax=new ActiveXObject('Microsoft.XMLHTTP');
			}
			oAjax.open('GET', urlCity, true);
			oAjax.send(null);
			oAjax.onreadystatechange=function(){
				if(oAjax.readyState==4){
					if(oAjax.status==200){
						_strCity = JSON.parse(oAjax.responseText);
						apiStatus = _strCity["HeWeather data service 3.0"][0]["status"];
						if (apiStatus == "unknown city") {
							alert("糟糕！没有找到您输入的城市...");
							return;
						}
						else if (apiStatus == "no more requests") {
							alert("超过访问次数...");
							return;
						}
						else if (apiStatus == "anr") {
							alert("服务无响应或超时...");
							return;
						}
						else if (apiStatus == "ok") {
							$.mobile.changePage("#page1");
						}
					}
				}
			};
		}
	});
});

function ajax(num, url){
	if(window.XMLHttpRequest){
		var oAjax=new XMLHttpRequest;
	}
	else{
		var oAjax=new ActiveXObject('Microsoft.XMLHTTP');
	}
	oAjax.open('GET', url, true);
	oAjax.send(null);
	oAjax.onreadystatechange=function(){
		if(oAjax.readyState==4){
			if(oAjax.status==200){
				_strCity = JSON.parse(oAjax.responseText);
				var apiStatus = _strCity["HeWeather data service 3.0"][0]["status"];
				if (apiStatus == "") {}
				switch(num){
					case 1: showDetailOne(); break;
					case 2: showDetailTwo(); break;
					case 3: showDetailThree(); break;
					default: alert("参数错误！"); break;
				}
			}
			else{
				if (oAjax.status==0) {
					alert("请求失败！没有网络连接...");
				//alert("请求失败！错误码："+oAjax.status)
				}
			}
		}
	};
}


function showDetailOne(){
	$(".refresh p").html(_strCity["HeWeather data service 3.0"][0]["basic"]["update"]["loc"].substring(11)+'更新');
	$(".page1_pos span").html(_strCity["HeWeather data service 3.0"][0]["basic"]["city"]);
	$(".basic .tmp").html(_strCity["HeWeather data service 3.0"][0]["now"]["tmp"]+'℃');
	$(".basic .basic_txt").html(_strCity["HeWeather data service 3.0"][0]["now"]["cond"]["txt"]);
	$(".basic .basic_max").html(_strCity["HeWeather data service 3.0"][0]["daily_forecast"][0]["tmp"]["max"] + '℃');
	$(".basic .basic_min").html('&nbsp;&nbsp;&nbsp;&nbsp;'+_strCity["HeWeather data service 3.0"][0]["daily_forecast"][0]["tmp"]["min"] + '℃');
	$(".basic .basic_hum").html('&nbsp;&nbsp;&nbsp;&nbsp;'+_strCity["HeWeather data service 3.0"][0]["now"]["hum"] + '%');
	$(".basic .basic_dir").html(_strCity["HeWeather data service 3.0"][0]["now"]["wind"]["dir"]);
	$(".basic .basic_sc").html('&nbsp;&nbsp;&nbsp;&nbsp;'+_strCity["HeWeather data service 3.0"][0]["now"]["wind"]["sc"]+'级');
	$(".basic .basic_sr").html('日出&nbsp;&nbsp;&nbsp;&nbsp;'+_strCity["HeWeather data service 3.0"][0]["daily_forecast"][0]["astro"]["sr"]);
	$(".basic .basic_ss").html('&nbsp;&nbsp;&nbsp;&nbsp;'+'日落&nbsp;&nbsp;&nbsp;&nbsp;'+_strCity["HeWeather data service 3.0"][0]["daily_forecast"][0]["astro"]["ss"]);
	$(".comf span").html(_strCity["HeWeather data service 3.0"][0]["suggestion"]["comf"]["brf"]);
	$(".drsg span").html(_strCity["HeWeather data service 3.0"][0]["suggestion"]["drsg"]["brf"]);
	$(".uv span").html(_strCity["HeWeather data service 3.0"][0]["suggestion"]["uv"]["brf"]);
	$(".cw span").html(_strCity["HeWeather data service 3.0"][0]["suggestion"]["cw"]["brf"]);
	$(".trav span").html(_strCity["HeWeather data service 3.0"][0]["suggestion"]["trav"]["brf"]);
	$(".flu span").html(_strCity["HeWeather data service 3.0"][0]["suggestion"]["flu"]["brf"]);
	$(".sport span").html(_strCity["HeWeather data service 3.0"][0]["suggestion"]["sport"]["brf"]);
	$("#comf p").html(_strCity["HeWeather data service 3.0"][0]["suggestion"]["comf"]["txt"]);
	$("#drsg p").html(_strCity["HeWeather data service 3.0"][0]["suggestion"]["drsg"]["txt"]);
	$("#uv p").html(_strCity["HeWeather data service 3.0"][0]["suggestion"]["uv"]["txt"]);
	$("#cw p").html(_strCity["HeWeather data service 3.0"][0]["suggestion"]["cw"]["txt"]);
	$("#trav p").html(_strCity["HeWeather data service 3.0"][0]["suggestion"]["trav"]["txt"]);
	$("#flu p").html(_strCity["HeWeather data service 3.0"][0]["suggestion"]["flu"]["txt"]);
	$("#sport p").html(_strCity["HeWeather data service 3.0"][0]["suggestion"]["sport"]["txt"]);
	//alert(_strCity["HeWeather data service 3.0"][0]["hourly_forecast"].length);
	var hourly_forecast = _strCity["HeWeather data service 3.0"][0]["hourly_forecast"];
	//alert(hourly_forecast.length)
	var trContent1 = "";
	var trContent2 = "";
	var trContent3 = "";
	var trContent4 = "";
	for (var i = 0; i < hourly_forecast.length; i++) {
	//<tr><td></td> <td></td> <td></td> <td></td> <td></td></tr>
	//alert(hourly_forecast[i]["date"].substring(11));
	trContent1 += '<td>' + hourly_forecast[i]["date"].substring(11) + '</td>';
	trContent2 += '<td>' + hourly_forecast[i]["tmp"] + '℃</td>';
	trContent3 += '<td>' + hourly_forecast[i]["wind"]["dir"] + '</td>';
	trContent4 += '<td>' + hourly_forecast[i]["wind"]["sc"] + '</td>';
	//alert(trContent1);
	}
	document.getElementsByTagName("table")[0].innerHTML = '<tr>' + trContent1 + '</tr>';
	document.getElementsByTagName("table")[0].innerHTML += '<tr>' + trContent2 + '</tr>';
	document.getElementsByTagName("table")[0].innerHTML += '<tr>' + trContent3 + '</tr>';
	document.getElementsByTagName("table")[0].innerHTML += '<tr>' + trContent4 + '</tr>';

	//有些小城市没有aqi数据，放到最下面以确保以上其他数据能正常显示
	$(".aqi .aqi_l").html(_strCity["HeWeather data service 3.0"][0]["aqi"]["city"]["aqi"]);
	$(".aqi .aqi_r").html('&nbsp;&nbsp;&nbsp;&nbsp;'+_strCity["HeWeather data service 3.0"][0]["aqi"]["city"]["qlty"]);
	$(".aqi .pm25_r").html('&nbsp;&nbsp;&nbsp;&nbsp;'+_strCity["HeWeather data service 3.0"][0]["aqi"]["city"]["pm25"]);
}


function showDetailTwo(){

/*	_date = _strCity["HeWeather data service 3.0"][0]["daily_forecast"][0]["date"].substring(5);
	_code_d = _strCity["HeWeather data service 3.0"][0]["daily_forecast"][0]["cond"]["code_d"];
	_code_n = _strCity["HeWeather data service 3.0"][0]["daily_forecast"][0]["cond"]["code_n"];
	_max = _strCity["HeWeather data service 3.0"][0]["daily_forecast"][0]["tmp"]["max"];
	_min = _strCity["HeWeather data service 3.0"][0]["daily_forecast"][0]["tmp"]["min"];
	_txt_d = _strCity["HeWeather data service 3.0"][0]["daily_forecast"][0]["cond"]["txt_d"];
	_txt_n = _strCity["HeWeather data service 3.0"][0]["daily_forecast"][0]["cond"]["txt_n"];
	_sr = _strCity["HeWeather data service 3.0"][0]["daily_forecast"][0]["astro"]["sr"];
	_ss = _strCity["HeWeather data service 3.0"][0]["daily_forecast"][0]["astro"]["ss"];
	_dir = _strCity["HeWeather data service 3.0"][0]["daily_forecast"][0]["wind"]["dir"];
	_sc = _strCity["HeWeather data service 3.0"][0]["daily_forecast"][0]["wind"]["sc"];*/
	var a = document.getElementsByClassName("collap-title-left");
	for (var i = 2; i < a.length; i++) {
		a[i].innerHTML=_strCity["HeWeather data service 3.0"][0]["daily_forecast"][i]["date"].substring(5);
	}
	var b = document.getElementsByClassName("pic_ds");
	for (var i = 0; i < b.length; i++) {
		b[i].src="http://files.heweather.com/cond_icon/"+_strCity["HeWeather data service 3.0"][0]["daily_forecast"][i]["cond"]["code_d"]+".png";
	}
	var c = document.getElementsByClassName("pic_ns");
	for (var i = 0; i < c.length; i++) {
		c[i].src="http://files.heweather.com/cond_icon/"+_strCity["HeWeather data service 3.0"][0]["daily_forecast"][i]["cond"]["code_n"]+".png";
	}
	var d = document.getElementsByClassName("pic_d");
	for (var i = 0; i < d.length; i++) {
		d[i].src="http://files.heweather.com/cond_icon/"+_strCity["HeWeather data service 3.0"][0]["daily_forecast"][i]["cond"]["code_d"]+".png";
	}
	var e = document.getElementsByClassName("pic_n");
	for (var i = 0; i < e.length; i++) {
		e[i].src="http://files.heweather.com/cond_icon/"+_strCity["HeWeather data service 3.0"][0]["daily_forecast"][i]["cond"]["code_n"]+".png";
	}
	var f = document.getElementsByClassName("collap-title-right");
	for (var i = 0; i < f.length; i++) {
		f[i].innerHTML='<span>' + _strCity["HeWeather data service 3.0"][0]["daily_forecast"][i]["tmp"]["max"] + '℃/' + _strCity["HeWeather data service 3.0"][0]["daily_forecast"][i]["tmp"]["min"] + '℃</span>';
	}
	var g = document.getElementsByClassName("collap-content-bottom");
	for (var i = 0; i < g.length; i++) {
		g[i].innerHTML=_strCity["HeWeather data service 3.0"][0]["daily_forecast"][i]["wind"]["dir"]+'&nbsp;&nbsp;&nbsp;&nbsp;'+_strCity["HeWeather data service 3.0"][0]["daily_forecast"][i]["wind"]["sc"]+'级';
	}
	var h = document.getElementsByClassName("sunrise");
	for (var i = 0; i < h.length; i++) {
		h[i].innerHTML='日出&nbsp;&nbsp;&nbsp;&nbsp;'+_strCity["HeWeather data service 3.0"][0]["daily_forecast"][i]["astro"]["sr"];
	}
	var j = document.getElementsByClassName("sundown");
	for (var i = 0; i < j.length; i++) {
		j[i].innerHTML='日落&nbsp;&nbsp;&nbsp;&nbsp;'+_strCity["HeWeather data service 3.0"][0]["daily_forecast"][i]["astro"]["ss"];
	}
	var k = document.getElementsByClassName("left");
	for (var i = 0; i < k.length; i++) {
		k[i].innerHTML=_strCity["HeWeather data service 3.0"][0]["daily_forecast"][i]["cond"]["txt_d"];
	}
	var l = document.getElementsByClassName("right");
	for (var i = 0; i < l.length; i++) {
		l[i].innerHTML=_strCity["HeWeather data service 3.0"][0]["daily_forecast"][i]["cond"]["txt_n"];
	}
}


function showDetailThree(){
	$("#pcpn span").html(_strCity["HeWeather data service 3.0"][0]["now"]["pcpn"]);
	var hourly_forecast = _strCity["HeWeather data service 3.0"][0]["hourly_forecast"];
	var trCon1 = "<td>时间</td>";
	var trCon2 = "<td>降水概率</td>";
	var trCon3 = "<td>湿度</td>";
	for (var i = 0; i < hourly_forecast.length; i++) {
		trCon1 += '<td>' + hourly_forecast[i]["date"].substring(11) + '</td>';
		trCon2 += '<td>' + hourly_forecast[i]["pop"] + '%</td>';
		trCon3 += '<td>' + hourly_forecast[i]["hum"] + '%</td>';
	}
	document.getElementsByTagName("table")[1].innerHTML = '<tr>' + trCon1 + '</tr>';
	document.getElementsByTagName("table")[1].innerHTML += '<tr>' + trCon2 + '</tr>';
	document.getElementsByTagName("table")[1].innerHTML += '<tr>' + trCon3 + '</tr>';



	var daily_forecast = _strCity["HeWeather data service 3.0"][0]["daily_forecast"];
	var trCont1 = "<td>时间</td><td>今天</td><td>明天</td>";
	var trCont2 = "<td>降雨量</td>";
	var trCont3 = "<td>降水概率</td>";
	var trCont4 = "<td>湿度</td>";
	for (var i = 2; i < daily_forecast.length; i++) {
		trCont1 += '<td>' + daily_forecast[i]["date"].substring(5) + '</td>';
	}
	for (var i = 0; i < daily_forecast.length; i++) {
		trCont2 += '<td>' + daily_forecast[i]["pcpn"] + 'mm</td>';
		trCont3 += '<td>' + daily_forecast[i]["pop"] + '%</td>';
		trCont4 += '<td>' + daily_forecast[i]["hum"] + '%</td>';
	}
	document.getElementsByTagName("table")[2].innerHTML = '<tr>' + trCont1 + '</tr>';
	document.getElementsByTagName("table")[2].innerHTML += '<tr>' + trCont2 + '</tr>';
	document.getElementsByTagName("table")[2].innerHTML += '<tr>' + trCont3 + '</tr>';
	document.getElementsByTagName("table")[2].innerHTML += '<tr>' + trCont4 + '</tr>';
}

function getLoc(){
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
			function(position){
				var lon = position.coords.longitude;	//经度
				var lat = position.coords.latitude;		//纬度
				//alert("经度："+lon+"纬度："+lat);
				var point = new BMap.Point(lon, lat);
				var geoc = new BMap.Geocoder();
				geoc.getLocation(point, function(rs){	//getLocation函数用来解析地址信息，分别返回省市区街等
					var addComp = rs.addressComponents;
	                var province = addComp.province;//获取省份
	                var city = addComp.city;//获取城市
	                var district = addComp.district;//区
	                var street = addComp.street;//街
	                $("#position_p span").html(province + city + district + street);
				})
			},
			function(err){
				switch (err.code){
					case err.TIMEOUT: alert("链接超时，请重试！"); break;
					case err.PERMISSION_DENIED: alert("您拒绝了使用位置共享服务，查询已取消。"); break;
					case err.POSITION_UNAVAILABLE: alert("未能找到您的位置，请重试！"); break;
				}
			},
			{
				enableHighAccuracy : true,	//告诉浏览器是否启用高精度设备GPS,WIFI,IP
				maximumAge : 30000,			//告诉设备缓存时间
				timeout : 10000				//超时事件，错误码指向TIMEOUT
			}
		);
	}
	else{
		alert("您的浏览器不支持地理定位...");
	}
}