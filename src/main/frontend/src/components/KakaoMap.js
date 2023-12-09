import {useEffect} from "react";

export const KakaoMap = () => {
    useEffect(() => {
        let container = document.getElementById("map");
        let options = {
            center: new window.kakao.maps.LatLng(37.8741656, 127.1561228),
            level: 3
        };
        let map = new window.kakao.maps.Map(container, options);
        let markerPosition = new window.kakao.maps.LatLng(37.8741656, 127.1561228);
        let marker = new window.kakao.maps.Marker({
            position: markerPosition
        });
        marker.setMap(map);
    }, [])

    return (<div>
        <div id="map" style={{width:"100%", height:"500px"}}></div>
    </div>)
}