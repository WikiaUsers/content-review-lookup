$(function () {

    $('#wandering-sword-playlist').html(`
        <div style="position:relative;width:560px;height:315px;">
            
            <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/AQh2pptdg9w"
                frameborder="0"
                style="pointer-events:none;"
            ></iframe>

            <a
                href="https://www.youtube.com/playlist?list=PLhDQ30vZfNoaRtTNhtb-3K4L2ezFRalLG"
                target="_blank"
                style="
                    position:absolute;
                    top:0;
                    left:0;
                    width:100%;
                    height:100%;
                    z-index:999;
                "
            ></a>

        </div>
    `);

});