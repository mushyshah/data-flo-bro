(function() {
        //Get HTML Canvas
        var canvas = document.getElementById('canvas'),
                context = canvas.getContext('2d');

        //Add listener for window resize
        window.addEventListener('resize', redrawCanvas);
        
        function redrawCanvas() {
                //Canvas to take full browser window
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
               
                //Crappy temp loop to create grid dots
                for(i=canvas.width/60 ; i< canvas.width ; i+=(canvas.width/30)){
                        for(j=canvas.width/60; j< canvas.height ; j+=(canvas.width/30)){
                                
                        context.fillStyle = "#8EA8C3";
                        context.beginPath();
                        context.arc(i, j, 3, 0, Math.PI * 2, true);
                        context.fill();

                        }
                }

        }

        //Draw Canvas
        redrawCanvas();
        
})();