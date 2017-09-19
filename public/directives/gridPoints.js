// Create factory that would be used to create array of grid anchor points
app.factory('gPoints', function(){
    
        return {
            func:function(xTotal,yTotal,w,include,response){
            
            // Initialize points variable
            var points = [];
            points.length=0;
            
            // Set x and y division values
            var xDivision = (w.innerWidth/xTotal);
            var yDivision = (w.innerHeight/yTotal);
    
            // Create all anchor points
                for(i=0; i< xTotal ; i++){
                    for(j=0; j< yTotal ; j++){
                        var anchorPoint = {"x": 0,"y": 0};
    
                        // Create point pixel values via loop and division values
                        anchorPoint.x = (xDivision/2) + Math.round(i*xDivision);
                        anchorPoint.y = (yDivision/2) + Math.round(j*yDivision);
                        
                        // To provide even padding on left/right top/down of grid
                        if(i==0)
                        anchorPoint.x = Math.round(xDivision/2);
                        if(j==0)
                        anchorPoint.y = Math.round(yDivision/2);
    
                            // Unnecessary calculations here, don't wanna touch, no harm.
                            // Don't include points that are on right and bottom end of screen (don't wanna draw there)
                            if(((i*xDivision)+(1.5*xDivision)<w.innerWidth) && ((j*yDivision)+(1.5*yDivision)<w.innerHeight))
                                points.push(anchorPoint);
                            // Unless specifically want to include it for the grid dots
                            else if(!include)
                            points.push(anchorPoint);
                    }
                }
    
                //Callback function with point values
                response(points);
                
            }
        };
    
    });
    