function initMap() {


	const center = new google.maps.LatLng(48.73946, 19.15349);

	const options = {
		zoom: 8,
		center: center,
		mapId: 'f3b14870570afc81',
	};

	const map = new google.maps.Map(document.getElementById('map'), options);
	const sideMenu = document.getElementById('sidebar');

	map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(
		document.getElementById('sidebar')
	);


	const fetchData = async () => {

		try {

			const url =
				'https://bgbruno.com/preview/kami-profit.sk/map-point-profile/source.json';

			const res = await fetch(url);
			const data = await res.json();

			for (let i = 0; i < data.length; i++) {
				addMarker(data[i]);
			}

		} catch (err) {
			console.error(err);
		}

	};

	fetchData();


	const addMarker = (data) => {

		const myLatlng = new google.maps.LatLng(
			parseFloat(data.geo.latitude),
			parseFloat(data.geo.longitude)
		);

		const svgMarker = {
			path: 'M 256 0 C 167.641 0 96 71.625 96 160 c 0 24.75 5.625 48.219 15.672 69.125 C 112.234 230.313 256 512 256 512 l 142.594 -279.375 C 409.719 210.844 416 186.156 416 160 C 416 71.625 344.375 0 256 0 Z M 256 256 c -53.016 0 -96 -43 -96 -96 s 42.984 -96 96 -96 c 53 0 96 43 96 96 S 309 256 256 256 Z',
			fillColor: '#E00549',
			fillOpacity: 1,
			strokeWeight: 0,
			scale: 0.05,
		};

		const marker = new google.maps.Marker({
			position: myLatlng,
			map: map,
			icon: svgMarker,
		});

		if (data) {

			const infoWindow = new google.maps.InfoWindow({
				content: `${data.title}</h2>`,
			});

			marker.addListener('click', () => {

				sideMenu.innerHTML =
					`
<div class="sidebar-wrapper">
	<h1>${data.title}</h1>
	${data.featuredimg}
	<div class="details">
		<p>MIESTO REALIZÁCIE: ${data.miesto}</p>
		<p>DRUH STAVBY ${data.typstavbystr}</p>
		<p>GENERÁLNY DODÁVATEĽ ${data.generalny_dodavatel ? data.generalny_dodavatel : ''}</p>
		<p>ČINNOSŤ ${data.cinnostistr}</p>
		<p>ZAČIATOK VÝSTAVBY ${data.zac_prac}</p>
		<p>KONIEC VÝSTAVBY ${data.ukonc_prac}</p>
		<p>OBJEM PREINVESTOVANÝCH FINANCIÍ ${data.vyska_investicie}</p>
		<p>PROJEKTOVÝ MANAŽMENT ${data.projektant ? data.projektant : ''}</p>
	</div>
</div>
				`;

				infoWindow.open(map, marker);
				sideMenu.classList.add('active');
				map.addListener('click', () => {
					infoWindow.close();
				});

			});

		}

	};


	const closeSidemenu = () => {
		map.addListener('click', () => {
			sideMenu.classList.remove('active');
		});
	};

	closeSidemenu();


}
