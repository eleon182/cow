(function() {

    angular.module('cowApp').directive('speedometerDir', speedometerDir);
    speedometerDir.$inject = [];

    function speedometerDir() {
        return {
            link: link,
            restrict: 'EA',
            replace: false,
            templateUrl: 'app/directive/template/speedometerTml.html',
            scope: {
                data: '=',
                config: '=',
                //sliderCallBack: '&',
                submitGoal: '&'
            },
        };

        function link(scope, element) {
            scope.sanitized = {};
            scope.sanitized.data = {};

            sanitizeData(scope);
            sanitizeConfig(scope);

            scope.$watch('data.potentialScore', function() {
                sanitizeData(scope);
                buildSpeedometer(scope);
            });
            scope.setGoal = function() {
                scope.submitGoal({
                    goal: scope.sanitized.data.potentialScore
                }).then(function() {
                    scope.goalSet = true;
                    scope.showButton = false;
                }, function(err) {
                    scope.goalSetError = true;
                    scope.showButton = false;
                });
            }
        }

        function sanitizeConfig(scope) {
            scope.sanitized.config = {};
            scope.sanitized.config.size = 0.7;
            scope.sanitized.config.showSetGoal = false;
            scope.sanitized.config.potentialScore = {
                color: '#0099CC',
                size: 80,
                font: 'Arial'
            };
            scope.sanitized.config.potentialScoreRisk = {
                color: '#828282',
                size: 15,
                font: 'Arial'
            };
            scope.sanitized.config.potentialScoreLabel = {
                color: '#4D4D4D',
                size: 20,
                font: 'Arial'
            };
            scope.sanitized.config.currentScore = {
                color: '#000000',
                size: 40,
                font: 'Arial'
            };
            scope.sanitized.config.currentScoreRisk = {
                color: '#828282',
                size: 15,
                font: 'Arial'
            };
            scope.sanitized.config.currentScoreLabel = {
                color: '#333333',
                size: 15,
                font: 'Arial'
            };
            scope.sanitized.config.min = {
                color: '#A4A4A4',
                size: 16,
                font: 'Arial'
            };
            scope.sanitized.config.max = {
                color: '#A4A4A4',
                size: 16,
                font: 'Arial'
            };
            if (scope.config) {
                if (scope.config.size) {
                    scope.sanitized.config.size = scope.config.size;
                }
                if (scope.config.showSetGoal) {
                    scope.sanitized.config.showSetGoal = scope.config.showSetGoal;
                }
                if (scope.config.potentialScore && scope.config.potentialScore.size &&
                    scope.config.potentialScore.color && scope.config.potentialScore.font) {
                    scope.sanitized.config.potentialScore = scope.config.potentialScore;
                }

                if (scope.config.potentialScoreRisk && scope.config.potentialScoreRisk.size &&
                    scope.config.potentialScoreRisk.color && scope.config.potentialScoreRisk.font) {
                    scope.sanitized.config.potentialScoreRisk = scope.config.potentialScoreRisk;
                }

                if (scope.config.potentialScoreLabel && scope.config.potentialScoreLabel.size &&
                    scope.config.potentialScoreLabel.color && scope.config.potentialScoreLabel.font) {
                    scope.sanitized.config.potentialScoreLabel = scope.config.potentialScoreLabel;
                }

                if (scope.config.currentScore && scope.config.currentScore.size &&
                    scope.config.currentScore.color && scope.config.currentScore.font) {
                    scope.sanitized.config.currentScore = scope.config.currentScore;
                }

                if (scope.config.currentScoreRisk && scope.config.currentScoreRisk.size &&
                    scope.config.currentScoreRisk.color && scope.config.currentScoreRisk.font) {
                    scope.sanitized.config.currentScoreRisk = scope.config.currentScoreRisk;
                }

                if (scope.config.currentScoreLabel && scope.config.currentScoreLabel.size &&
                    scope.config.currentScoreLabel.color && scope.config.currentScoreLabel.font) {
                    scope.sanitized.config.currentScoreLabel = scope.config.currentScoreLabel;
                }
                if (scope.config.min && scope.config.min.size &&
                    scope.config.min.color && scope.config.min.font) {
                    scope.sanitized.config.min = scope.config.min;
                }
                if (scope.config.max && scope.config.max.size &&
                    scope.config.max.color && scope.config.max.font) {
                    scope.sanitized.config.max = scope.config.max;
                }
            }
        }

        function sanitizeData(scope) {
            scope.goalSet = false;
            scope.showButton = true;
            scope.goalSetError = false;
            scope.sanitized.data.animate = 'true';

            scope.sanitized.scoreDate = "";

            scope.sanitized.data.currentScore = 300;
            scope.sanitized.data.potentialScore = 300;
            //  scope.sanitized.data.previousPotentialScore = 300;
            scope.sanitized.data.currentScoreRisk = 'Medium Risk';

            scope.sanitized.data.potentialScoreRisk = 'Medium Risk';
            scope.sanitized.data.buttonUrl = '';
            scope.sanitized.data.buttonText = 'SET AS GOAL';

            scope.sanitized.data.min = 300;
            scope.sanitized.data.max = 850;
            scope.sanitized.data.potentialRiskImage = '';

            scope.sanitized.data.footer = '';
            scope.sanitized.data.sliderUnits = 'month';
            scope.sanitized.data.disclaimer = 'Current FICO® score and simulated score based on Experian data as of 12/16/2014';
            scope.sanitized.data.speedometerBreakpoints = [

                {
                    color: '#cd3433',
                    max: 579
                }, {
                    color: '#ff7b2a',
                    max: 669
                }, {
                    color: '#f7c708',
                    max: 739
                }, {
                    color: '#98d30c',
                    max: 779
                }, {
                    color: '#1ac618',
                    max: 850
                }
            ];

            // scope.sanitized.data.sliderArray = [];

            if (scope.data) {
                if (scope.data.animate) {
                    scope.sanitized.data.animate = scope.data.animate;
                }

                if (scope.data.scoreDate) {
                    scope.sanitized.data.scoreDate = scope.data.scoreDate;
                }

                if (parseInt(scope.data.min, 10)) {
                    scope.sanitized.data.min = parseInt(scope.data.min, 10);
                }
                if (scope.data.max && parseInt(scope.data.max, 10)) {
                    if (parseInt(scope.data.max, 10) > scope.sanitized.data.min) {
                        scope.sanitized.data.max = parseInt(scope.data.max, 10);
                    }
                }

                if (parseInt(scope.data.potentialScore, 10)) {
                    scope.sanitized.data.potentialScore = parseInt(scope.data.potentialScore, 10);
                }

                if (parseInt(scope.data.currentScore, 10)) {
                    scope.sanitized.data.currentScore = parseInt(scope.data.currentScore, 10);
                    if (scope.sanitized.data.currentScore < scope.sanitized.data.min) {
                        scope.sanitized.data.currentScore = scope.sanitized.data.min
                    } else if (scope.sanitized.data.currentScore > scope.sanitized.data.max) {
                        scope.sanitized.data.currentScore = scope.sanitized.data.max
                    }
                }

                if (scope.data.currentScoreRisk) {
                    scope.sanitized.data.currentScoreRisk = scope.data.currentScoreRisk;
                }

                if (scope.data.potentialScoreRisk) {
                    scope.sanitized.data.potentialScoreRisk = scope.data.potentialScoreRisk;
                }

                if (scope.data.buttonUrl ) {
                    scope.sanitized.data.buttonUrl = scope.data.buttonUrl;
                }
                if (scope.data.buttonText) {
                    scope.sanitized.data.buttonText = scope.data.buttonText;
                }

                if (scope.data.footer) {
                    scope.sanitized.data.footer = scope.data.footer;
                }
                // if (scope.data.sliderUnits) {
                //     scope.sanitized.data.sliderUnits = scope.data.sliderUnits;
                // }

                // if (scope.data.sliderArray && ecsValidationFty.isArray(scope.data.sliderArray)) {

                //     for (var i = 0; i < scope.data.sliderArray.length; i++) {
                //         if (scope.data.sliderArray[i].key && scope.data.sliderArray[i].value) {

                //             scope.sanitized.data.sliderArray.push(scope.data.sliderArray[i]);
                //         }
                //         else {
                //             break;
                //         }
                //     }
                // }
                if (parseInt(scope.data.potentialScore, 10)) {
                    scope.sanitized.data.potentialScore = parseInt(scope.data.potentialScore, 10);
                    if (scope.sanitized.data.potentialScore < scope.sanitized.data.min) {
                        scope.sanitized.data.potentialScore = scope.sanitized.data.min
                    } else if (scope.sanitized.data.potentialScore > scope.sanitized.data.max) {
                        scope.sanitized.data.potentialScore = scope.sanitized.data.max
                    }
                }



                if (scope.data.speedometerBreakpoints ) {

                    for (var k = 0; k < scope.data.speedometerBreakpoints.length; k++) {
                        if (scope.data.speedometerBreakpoints[k].color && scope.data.speedometerBreakpoints[k].max) {
                            if (k === 0) {
                                scope.sanitized.data.speedometerBreakpoints.length = 0;
                            }
                            scope.sanitized.data.speedometerBreakpoints.push(scope.data.speedometerBreakpoints[k]);
                        } else {
                            break;
                        }
                    }
                }
            }
        }

        function buildSpeedometer(scope) {
           // document.getElementById('ecsScorePlannerSpeedometer');
            //document.getElementById('ecsScorePlannerSpeedometer').style.width = 600 * scope.sanitized.config.size + 'px';

            var context = document.getElementById('speedometer').getContext('2d');
            //context.canvas.width = 600 * scope.sanitized.config.size;
            //context.canvas.height = 450 * scope.sanitized.config.size;
            context.canvas.width = 380 * scope.sanitized.config.size;
            context.canvas.height = 350 * scope.sanitized.config.size;
            context.scale(scope.sanitized.config.size, scope.sanitized.config.size);
            //var x = 300;
            //var y = 290;
            var x = 192;
            var y = 190;


            if (scope.sanitized.data.animate === 'false') {
                context.clearRect(0, 0, 600, 450);
                drawSpeedometer(scope.sanitized.data.potentialScore, x, y, context, scope);
                return;
            }
            var step = scope.sanitized.data.previousPotentialScore;
            var animSpeed = 30;
            var changeSpeed;
            if (scope.sanitized.data.potentialScore <= scope.sanitized.data.previousPotentialScore) {
                animateDec();
            } else {
                animateInc();
            }
            scope.sanitized.data.previousPotentialScore = scope.sanitized.data.potentialScore;

            function animateDec() {
                if (step >= scope.sanitized.data.potentialScore) {
                    context.clearRect(0, 0, 600, 450);
                    drawSpeedometer(step, x, y, context, scope);
                    step -= 11;

                    changeSpeed = (step - scope.sanitized.data.potentialScore) / (scope.sanitized.data.previousPotentialScore - scope.sanitized.data.potentialScore);
                    if (changeSpeed < 0.15) {
                        animSpeed += 2;
                    }
                    setTimeout(function() {
                        animateDec();
                    }, animSpeed);

                } else {
                    context.clearRect(0, 0, 600, 450);
                    drawSpeedometer(scope.sanitized.data.potentialScore, x, y, context, scope);
                }
            }

            function animateInc() {
                if (step <= scope.sanitized.data.potentialScore) {
                    context.clearRect(0, 0, 600, 450);
                    drawSpeedometer(step, x, y, context, scope);
                    step += 11;
                    changeSpeed = (step - scope.sanitized.data.previousPotentialScore) / (scope.sanitized.data.potentialScore - scope.sanitized.data.previousPotentialScore);
                    if (changeSpeed > 0.85) {
                        animSpeed += 2;
                    }
                    setTimeout(function() {
                        animateInc();
                    }, animSpeed);
                } else {
                    context.clearRect(0, 0, 600, 450);
                    drawSpeedometer(scope.sanitized.data.potentialScore, x, y, context, scope);
                }
            }
        }

        function calculateValue(value, scope) {

            var perc = (value - scope.sanitized.data.min) / (scope.sanitized.data.max - scope.sanitized.data.min);
            if (perc > 1) {
                perc = 1;
            }
            if (perc < 0) {
                perc = 0;
            }
            return Math.PI * (perc * 1.4 - 1.2);

        }

        function outercircle(x, y, context, scope) {
            //start outer circle 
            //var radius = 170;
            var startAngle = calculateValue(scope.sanitized.data.currentScore, scope); // calculate the starting point for the circle 

            drawOuterCircle(x, y, startAngle, context, scope);
            //  drawOuterCircleText(x, y, startAngle, context, scope);

        }

        function drawOuterCircleText(x, y, startAngle, context, scope) {
            //start outer text 
            var cx = x + 230 * Math.cos(startAngle);
            var cy = y + 230 * Math.sin(startAngle);

            context.font = scope.sanitized.config.currentScore.size + "px " + scope.sanitized.config.currentScore.font;
            context.fillStyle = scope.sanitized.config.currentScore.color;
            var textWidth = context.measureText(scope.sanitized.data.currentScore).width;
            context.fillText(scope.sanitized.data.currentScore, cx - textWidth / 2, cy);


            // current score text
            context.font = scope.sanitized.config.currentScoreLabel.size + "px " + scope.sanitized.config.currentScoreLabel.font;
            // context.font = "15px " + scope.sanitized.data.font;
            context.fillStyle = scope.sanitized.config.currentScoreLabel.color;
            textWidth = context.measureText('Current FICO® score').width;
            context.fillText('Current FICO® score', cx - textWidth / 2, cy - 35);


            // type of risk text 
            context.font = scope.sanitized.config.currentScoreRisk.size + "px " + scope.sanitized.config.currentScoreRisk.font;
            //context.font = "15px " + scope.sanitized.data.font;
            context.fillStyle = scope.sanitized.config.currentScoreRisk.color;
            textWidth = context.measureText(scope.sanitized.data.currentScoreRisk).width;
            context.fillText(scope.sanitized.data.currentScoreRisk, cx - textWidth / 2, cy + 25);

        }

        function drawOuterCircle(x, y, startAngle, context) {

            // this block draws the circle outline on the outside that marks the current FICO score
            context.beginPath();
            context.arc(x, y, 170, 0.2 * Math.PI, Math.PI * -1.2, true);
            context.lineWidth = 6;
            context.strokeStyle = '#EEEEEE';
            context.stroke();

            // this block draws the circle outline on the outside that marks the current FICO score
            context.beginPath();
            context.arc(x, y, 170, startAngle, Math.PI * -1.2, true);
            context.lineWidth = 6;
            context.strokeStyle = '#A4A4A4';
            context.stroke();

            //// draw outer circle line
            //var cx = x + 170 * Math.cos(startAngle);
            //var cy = y + 170 * Math.sin(startAngle);
            //context.moveTo(cx, cy);
            //cx = x + 190 * Math.cos(startAngle);
            //cy = y + 190 * Math.sin(startAngle);
            //context.lineTo(cx, cy);
            //context.stroke();
        }

        function drawInnerCircleText(value, x, y, context, scope) {
            //load first color as default
            var valueColor = scope.sanitized.data.speedometerBreakpoints[0].color;

            //load the correct color based on the breakpoints
            for (var i = scope.sanitized.data.speedometerBreakpoints.length - 1; i > 0; i--) {

                if (value > scope.sanitized.data.speedometerBreakpoints[i - 1].max) {
                    valueColor = scope.sanitized.data.speedometerBreakpoints[i].color;
                    break;
                }
            }

            // print the actual score in the middle of the speedometer (i.e 744) 
            context.font = scope.sanitized.config.potentialScore.size + "px " + scope.sanitized.config.potentialScore.font;
            // context.fillStyle = scope.sanitized.config.potentialScore.color;
            context.fillStyle = valueColor;
            var textWidth = context.measureText(value.toString()).width;
            context.fillText(value, x - textWidth / 2, y + 10);

            ////dots under inner text .......... border
            //context.font = "30px " + scope.sanitized.data.font;
            //context.fillStyle = '#A4A4A4';
            //context.fillText('.................', x - 69, y + 45);

            //label potential score (i.e "Potential Score")
            context.font = scope.sanitized.config.potentialScoreLabel.size + "px " + scope.sanitized.config.potentialScoreLabel.font;
            context.fillStyle = scope.sanitized.config.potentialScoreLabel.color;
            textWidth = context.measureText('Potential Score').width;
            context.fillText('Potential Score', x - textWidth / 2, y + 50);

            //Potential score risk (i.e 'Very low risk')
            //context.font = scope.sanitized.config.potentialScoreRisk.size + "px " + scope.sanitized.config.potentialScoreRisk.font;
            //context.fillStyle = scope.sanitized.config.potentialScoreRisk.color;
            //textWidth = context.measureText(scope.sanitized.data.potentialScoreRisk).width;
            //context.fillText(scope.sanitized.data.potentialScoreRisk, x - textWidth / 2, y + 105);
            //// this is the image on the right side of the 'Very low risk' , (i.e the up or down red/green arrow)
            //var base_image = new Image();
            //base_image.src = scope.sanitized.data.potentialRiskImage;
            //base_image.onload = function () {
            //    context.drawImage(base_image, x + (textWidth / 2), y + 92, 15, 15);
            //};

            //print the minimum value of the speedometer (i.e 300)
            context.font = scope.sanitized.config.min.size + "px " + scope.sanitized.config.min.font;
            context.fillStyle = scope.sanitized.config.min.color;
            context.fillText(scope.sanitized.data.min, x - 110, y + 105);

            //show the maximum value of the speedometer (i.e 850)
            context.font = scope.sanitized.config.max.size + "px " + scope.sanitized.config.max.font;
            context.fillStyle = scope.sanitized.config.max.color;
            context.fillText(scope.sanitized.data.max, x + 80, y + 105);
        }

        function drawInnerCircle(value, x, y, context, scope) {
            //load first color as default
            var valueColor = scope.sanitized.data.speedometerBreakpoints[0].color;

            //load the correct color based on the breakpoints
            for (var i = scope.sanitized.data.speedometerBreakpoints.length - 1; i > 0; i--) {

                if (value > scope.sanitized.data.speedometerBreakpoints[i - 1].max) {
                    valueColor = scope.sanitized.data.speedometerBreakpoints[i].color;
                    break;
                }
            }
            //start inner circle outline
            context.beginPath();
            context.arc(x, y, 130, 0.2 * Math.PI, Math.PI * -1.2, true);
            context.lineWidth = 44;
            context.strokeStyle = '#EEEEEE';
            context.stroke();

            // start inner circle
            context.beginPath();
            context.arc(x, y, 130, calculateValue(value, scope), Math.PI * -1.2, true);
            context.lineWidth = 38;
            context.strokeStyle = valueColor;
            context.stroke();

        }

        function drawSpeedometer(value, x, y, context, scope) {
            outercircle(x, y, context, scope);

            drawInnerCircleText(value, x, y, context, scope);

            drawInnerCircle(value, x, y, context, scope);


        }
    }
})();