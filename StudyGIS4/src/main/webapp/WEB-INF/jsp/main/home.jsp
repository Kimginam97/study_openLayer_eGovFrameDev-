<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%
	request.setCharacterEncoding("utf-8");
%>
<%
	response.setContentType("text/html;charset=UTF-8");
%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=10">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Web GIS 테스트</title>

<style>
.bd-placeholder-img {
	font-size: 1.125rem;
	text-anchor: middle;
	-webkit-user-select: none;
	-moz-user-select: none;
	user-select: none;
}

@media ( min-width : 768px) {
	.bd-placeholder-img-lg {
		font-size: 3.5rem;
	}
}
</style>

<c:import url="../include/css_define.jsp"></c:import>
<c:import url="../include/js_define.jsp"></c:import>
</head>
<body>
	<header
		class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
		<a class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">Home</a>
		<button class="navbar-toggler position-absolute d-md-none collapsed"
			type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu"
			aria-controls="sidebarMenu" aria-expanded="false"
			aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
		</button>
		<input class="form-control form-control-dark w-100" type="text"
			placeholder="Search" aria-label="Search">
		<div class="navbar-nav">
			<div class="nav-item text-nowrap">
				<a class="nav-link px-3" href="#">Sign out</a>
			</div>
		</div>
	</header>

	<div class="container-fluid">
		<div class="row">
			<nav id="sidebarMenu"
				class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
				<div class="position-sticky pt-3">

					<a title='가산동' id='가산동' class='nav-link active'> <i class="fa fa-home fa-2x"></i></a> 
					<div class="alert alert-success" role="alert">맛집</div>
					<a title='가산물갈비' id='가산물갈비' class='nav-link '> 가산물갈비&백년불고기</a> 
					<a title='골목식당' id='골목식당' class='nav-link' href="#"> 골목식당</a> 
					<a title='스시초이' id='스시초이' class='nav-link' href="#"> 스시초이 </a> 
					<a title='망향비빔국수'id='망향비빔국수' class='nav-link' href="#"> 망향비빔국수</a> 
					<a title='봉추찜닭' id='봉추찜닭' class='nav-link' href="#">봉추찜닭</a> 
					<a title='소공동뚝배기' id='소공동뚝배기' class='nav-link' href="#">소공동뚝배기</a> 
					<div class="alert alert-info" role="alert">기본 레이어</div>
					<div class="form-check">
  						<input class="form-check-input" type="radio" value='OSMStandard' name='baseLayerRadioButton' checked>
  						<label class="form-check-label">
   							 OSM Standard
  						</label>
					</div>
					<div class="form-check">
 						<input class="form-check-input" type="radio" value='OSMHumanitarian' name='baseLayerRadioButton' >
  						<label class="form-check-label">
    						OSM Humanitarian
 						</label>
					</div>
					<div class="form-check">
  						<input class="form-check-input" type="radio" value='CartoDarkAll' name='baseLayerRadioButton'>
  						<label class="form-check-label">
   							 Carto Dark All
  						</label>
					</div>
					<div class="form-check">
 						<input class="form-check-input" type="radio" value='StamenTerrain' name='baseLayerRadioButton' >
  						<label class="form-check-label">
    						Stamen Terrain
 						</label>
					</div>
					<div class="alert alert-warning" role="alert">지도서비스기능</div>
					<div class="form-check">
  						<input class="form-check-input" type="checkbox" value="GasanCitiesLayer" name='LayerRadioButton' checked>
  							<label class="form-check-label">
   								 가산음식(GeoJSON)
  							</label>
					</div>
					<div class="form-check">
  						<input class="form-check-input" type="checkbox" value="MapPrimeLayer" name='LayerRadioButton'>
  							<label class="form-check-label">
    							시도행정구역(맵프라임)
  							</label>
					</div>
					<div class="alert alert-danger" role="alert">...</div>
					
				</div>
			</nav>

			<main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
				<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
					<h1 class="h2">가산디지털단지</h1>
					<div class="btn-toolbar mb-2 mb-md-0">
						<div class="btn-group me-2">
							<button type="button" class="btn btn-sm btn-outline-secondary">Share</button>
							<button type="button" class="btn btn-sm btn-outline-secondary">Export</button>
						</div>
						<button type="button"
							class="btn btn-sm btn-outline-secondary dropdown-toggle">
							<span data-feather="calendar"></span> This week
						</button>
					</div>
				</div>

				<div class="map" id='map'></div>

				<div class="grid-3" style="margin: 10px">
					<p id='imagename'>Welcome to Gasan Digital Cities Food Map</p>
					<img id='image' src="resources/data/images/main_image.jpg"
						alt="gasandong">
				</div>
				<div class="popover-information">
    				<p id='popover-text'></p>
  				</div>
			</main>
		</div>
	</div>

	<footer class="py-5" style="margin-top: 50px">
		<div class="row">
			<div class="col-2">
				<h5>Section</h5>
				<ul class="nav flex-column">
					<li class="nav-item mb-2"><a href="#"
						class="nav-link p-0 text-muted">Home</a></li>
					<li class="nav-item mb-2"><a href="#"
						class="nav-link p-0 text-muted">Features</a></li>
					<li class="nav-item mb-2"><a href="#"
						class="nav-link p-0 text-muted">Pricing</a></li>
					<li class="nav-item mb-2"><a href="#"
						class="nav-link p-0 text-muted">FAQs</a></li>
					<li class="nav-item mb-2"><a href="#"
						class="nav-link p-0 text-muted">About</a></li>
				</ul>
			</div>

			<div class="col-2">
				<h5>Section</h5>
				<ul class="nav flex-column">
					<li class="nav-item mb-2"><a href="#"
						class="nav-link p-0 text-muted">Home</a></li>
					<li class="nav-item mb-2"><a href="#"
						class="nav-link p-0 text-muted">Features</a></li>
					<li class="nav-item mb-2"><a href="#"
						class="nav-link p-0 text-muted">Pricing</a></li>
					<li class="nav-item mb-2"><a href="#"
						class="nav-link p-0 text-muted">FAQs</a></li>
					<li class="nav-item mb-2"><a href="#"
						class="nav-link p-0 text-muted">About</a></li>
				</ul>
			</div>

			<div class="col-2">
				<h5>Section</h5>
				<ul class="nav flex-column">
					<li class="nav-item mb-2"><a href="#"
						class="nav-link p-0 text-muted">Home</a></li>
					<li class="nav-item mb-2"><a href="#"
						class="nav-link p-0 text-muted">Features</a></li>
					<li class="nav-item mb-2"><a href="#"
						class="nav-link p-0 text-muted">Pricing</a></li>
					<li class="nav-item mb-2"><a href="#"
						class="nav-link p-0 text-muted">FAQs</a></li>
					<li class="nav-item mb-2"><a href="#"
						class="nav-link p-0 text-muted">About</a></li>
				</ul>
			</div>

			<div class="col-4 offset-1">
				<form>
					<h5>Subscribe to our newsletter</h5>
					<p>Monthly digest of whats new and exciting from us.</p>
					<div class="d-flex w-100 gap-2">
						<label for="newsletter1" class="visually-hidden">Email
							address</label> <input id="newsletter1" type="text" class="form-control"
							placeholder="Email address">
						<button class="btn btn-primary" type="button">Subscribe</button>
					</div>
				</form>
			</div>
		</div>
	</footer>
	<script src="https://kit.fontawesome.com/3fc7925dd4.js" crossorigin="anonymous"></script>
</body>
</html>
