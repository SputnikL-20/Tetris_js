	
	var shape_     = [
						[14, 15, 16, 25],		// Member
						[14, 15, 16],			// line
						[15, 24, 25, 34],		// Zuu
						[14, 15, 24, 25],		// Rectangle
						[16, 24, 25, 26],		// L
						[15, 16, 24, 25],		// Zuu revers
						[14, 24, 25, 26]		// L revers
				     ];
	
	var left_wall  = [10,20,30,40,50,60,70,80,90,100,110,120,130,140,150,160,170,180];
	var right_wall = [19,29,39,49,59,69,79,89,99,109,119,129,139,149,159,169,179,189];
	var down_wall  = [180,181,182,183,184,185,186,187,188,189];
	
	var shape_mod  = [];
	var wall 	   = [];
	var future_ID;
	var _ID		   = 0;
	var _num   	   = 0;
	var _score     = 0;
	var _level     = 0;
	var _speed     = 1000;
	var timeoutId;
	var intervalId;
	
		function init() {
			
			_num = 0;
			
			clearShapeWindow( [14, 15, 16, 24, 25, 26, 34] );
			
			future_ID !== undefined ? _ID = future_ID : _ID = 0;

			shape_mod = shape_[_ID];

			document.querySelector('.point').innerHTML = 'S : ' + _score;
			
			if ( Number(_score) >= 500 ) {
				_speed = 800;
				_level = 1;
			} 
			if ( Number(_score) >= 1000 ) {
				_speed = 600;
				_level = 2;
			} 
			if ( Number(_score) >= 2000 ) {
				_speed = 500;
				_level = 3;
			} 
			if ( Number(_score) >= 3000 ) {
				_speed = 400;
				_level = 4;
			}
			if ( Number(_score) >= 5000 ) {
				_speed = 300;
				_level = 5;
			}
			if ( Number(_score) < 500 ) {
				_speed = 900;
			} 
			
			document.querySelector('.level').innerHTML = 'L : ' + _level;
			
			if ( gameValidate(wall) == 0 ) {
				finishGame( '<H1>GAME OVER</H1>' );
			} else {
				
				drawShape();
				future_ID = Math.floor(Math.random() * 7);
				drawShapeWindow( shape_[future_ID] );
			}
		}


		function drawArea()
		{
			document.writeln("<span class='display-area'><table>");		
			for (var j = 1; j < 19; j++) {
				document.writeln("<tr>");

				for (var i = 0; i < 10; i++) {
					document.writeln("<td id=" + j + "" + i + "><canvas id='canva_" + j + "" + i + "' width='4' height='4'></canvas></td>");
				}
				document.writeln("</tr>");
			}
			document.writeln("</table></span>");	
			
			drawWindow();
			init();
		}
		
		function drawWindow()
		{
			document.writeln("<span class='window-area'><table>");		
			for (var j = 0; j < 5; j++) {
				document.writeln("<tr>");

				for (var i = 3; i < 8; i++) {
					document.writeln("<td id=" + j + "_" + i + "><canvas id='canva_w_" + j + "" + i + "' width='4' height='4'></canvas></td>");
				}
				document.writeln("</tr>");
			}
			document.writeln("</table></span>");	
		}
		
		function drawShapeWindow( args ) {

			for ( var i = 0; i < args.length; i++ ) {
				var arg = args[i].toString().split('');
				window.document.getElementById(arg[0] + '_' + arg[1]).style.backgroundColor = 'gray';
				window.document.getElementById(arg[0] + '_' + arg[1]).style.borderColor = 'black';		
				drawPast( 'canva_w_' + args[i] );	
			}		
		}
		
		function clearShapeWindow( args ) {

			for ( var i = 0; i < args.length; i++ ) {
				var arg = args[i].toString().split('');
				document.getElementById(arg[0] + '_' + arg[1]).style.background = 'none';
				document.getElementById(arg[0] + '_' + arg[1]).style.border = '0.1px solid #cdcdcd';	
				drawPastClear( 'canva_w_' + args[i] );	
			}		
		}

	function drawPast( id_canvas ) {
		var canvas = document.getElementById( id_canvas );
		try {
			if (canvas.getContext) {
				var ctx = canvas.getContext('2d');
				ctx.fillRect(0, 0, 8, 8);
			}		
		} catch (e) {
			null;
		}
	}
	
	function drawPastClear( id_canvas ) {
		var canvas = document.getElementById( id_canvas );
		try {
			if (canvas.getContext) {
				var ctx = canvas.getContext('2d');
				ctx.clearRect(0, 0, 8, 8);
			}		
		} catch (e) {
			null;
		}
	}
		
		function finishGame(str) {
			document.getElementById('notefication').innerHTML = str;
			document.getElementById('container').style.backgroundColor = 'gray';
			document.querySelector('.point').style.color = 'white';
			console.log('method finishGame()');
			
			intervalId = setInterval(function(){
				var a = document.getElementById('notefication').style.opacity || 1;
				document.getElementById('notefication').style.opacity = ((parseInt(a)) ? 0 : 1);
			}, 1e3);

		}
		
		function gameValidate(args) 
		{
			var j = 0;

			shape_mod.forEach( (item) => {

				if ( args.findIndex ( (el) => el == item ) != -1 ) {
					j++;
				} 

			});

			return j == 0 ? 1 : 0;
		}
		
		function leftBorder(mas) {
			var tmp = []
			var t   = 0;
			for ( var i = 0; i < 3; i++ ) {
				for ( var k = 0; k < mas.length; k++ ) {
					tmp[t] = mas[k] + i; 
					t++;
				}
			}
			return tmp;
		}
		
		function rightBorder(mas) {
			var tmp = []
			var t   = 0;
			for ( var i = 0; i < 3; i++ ) {
				for ( var k = 0; k < mas.length; k++ ) {
					tmp[t] = mas[k] - i; 
					t++;
				}
			}
			return tmp;
		}

		function drawShape() 
		{			
			
			drawShapePaint( shape_mod );
			
			if ( gameValidate( down_wall ) == 1 ) {
				
				if ( gameValidate( wall.map(item => Number(item) - 10) ) == 1 ) {
				
					setTimeout( clearShape, _speed, shape_mod );	
					
					oneDownShape( shape_mod );
					
					timeoutId = setTimeout( drawShape, _speed );
					
				} 
				else {
					colovratiy();
				}	
			} 
			else {
				colovratiy();
			}	
		}
		
		function colovratiy() {
			wall = wall.concat( shape_mod );
			wall.sort( (a, b) => a - b );
			recurPoint( wall );
			init();		
		}
		
		function recurPoint(arr) {

			var tmp = [];
			var del = [];
			var box = arr;
			var j = 0;
			
			for ( var i = 0; i < box.length; i++ ) {
			
				var m = box[i].toString().split('');
				
				f = m[m.length - 2];
				//     console.log('f - ' + m);

				for ( var k = i; k < box.length; k++ ) {

					var m = box[k].toString().split('');

					//       console.log(m[m.length - 2] + m[m.length - 1]);

					if ( f == m[m.length - 2] && m[m.length - 1] == j ) {

						j++;

						if ( j == 10 ) {
							<!-- console.log('j - ' + j); -->
							 // извлечь начало массива и увеличиваем на 10
							tmp = arr.splice(0, k - 9).map(item => Number(item) + 10);

								   <!-- console.log('tmp - ' + tmp);       -->
								   <!-- console.log('arr - ' + arr); -->

							del = arr.splice(0, 10);
							
							<!-- console.log('point - ' + del); -->
							
							clearShape(del);
							
							clearShape( tmp.map(item => Number(item) - 10) );
							
								   <!-- console.log(arr); -->
							wall = tmp.concat(arr); // соединяем с остатками

								   <!-- console.log('wall - ' + wall); -->
							wall.sort( (a, b) => a - b );

							drawShapePaint(wall);
							
							_score = _score + 10;

							recurPoint(wall);
	
							k = box.length;
							i = box.length;
						}
					} 
					else {
						j = 0;
						break;
					}	
				}
			}
			<!-- console.log('all - ' + wall); -->
		}
		
		function drawShapePaint(shape) {
			
			for ( var i = 0; i < shape.length; i++ ) {
				document.getElementById(shape[i].toString()).style.backgroundColor = 'gray';
				document.getElementById(shape[i].toString()).style.borderColor = 'black'
				drawPast( 'canva_' + shape[i] );	
			}
		}
		
		function clearShape(shape) {
		
			for ( var i = 0; i < shape.length; i++) {
				document.getElementById(shape[i].toString()).style.background = 'none';
				document.getElementById(shape[i].toString()).style.border = '0.1px solid #cdcdcd';
				drawPastClear( 'canva_' + shape[i] );	
			}
		}
		
		function oneLeftShape(shape) {
			<!-- var left_wall = [10,20,30,40,50,60,70,80,90,100,110,120,130,140,150,160,170,180]; -->
			var j = 0;
			shape.forEach( (item) => {

				if ( left_wall.findIndex ( (el) => el == item ) != -1 ) {
					j++;
				} 

			});
			if ( j == 0 ) {
				if ( gameValidate( wall.map(item => Number(item) + 1) ) == 1 ) {
					shape_mod = shape.map(item => Number(item) - 1);			
				}
			}
		}
		
		function oneRightShape(shape) {
			<!-- var right_wall = [19,29,39,49,59,69,79,89,99,109,119,129,139,149,159,169,179,189]; -->
			var j = 0;
			shape.forEach( (item) => {

				if ( right_wall.findIndex ( (el) => el == item ) != -1 ) {
					j++;
				} 

			});
			if ( j == 0 ) {
				if ( gameValidate( wall.map(item => Number(item) - 1) ) == 1 ) {
					shape_mod = shape.map(item => Number(item) + 1);
				}
			}
		}
		
		function oneDownShape(shape) {

				shape_mod = shape.map(item => Number(item) + 10);
				
		}
		

		
		
		function rotateShape(arr, _ID) {
			
			if ( _ID == 0 ) { // Member
				var tmp = [
					[arr[0] + 9, arr[1] + 0, arr[2] + 0, arr[3] + 0],				
					[arr[0] - 9, arr[1] - 1, arr[2] - 1, arr[3] + 0], 		
					[arr[0] + 0, arr[1] + 0, arr[2] + 0, arr[3] - 9],			
					[arr[0] + 0, arr[1] + 1, arr[2] + 1, arr[3] + 9] 	
				];
				
				_num++;
				if ( _num == 4 ) {
					_num = 0;
				}

				if ( gameValidate(left_wall) == 0 ) {
					var j = 0;
					tmp[_num].forEach( (item) => {
						if ( leftBorder(left_wall).findIndex ( (el) => el == item ) != -1 ) {
							j++;
						} 
					});

					j == 4 ? shape_mod = tmp[_num] : shape_mod = tmp[_num].map(item => Number(item) + 1);
				} 
				else if ( gameValidate(right_wall) == 0 ) {
					var j = 0;
					tmp[_num].forEach( (item) => {
						if ( rightBorder(right_wall).findIndex ( (el) => el == item ) != -1 ) {
							j++;
						} 
					});

					j == 4 ? shape_mod = tmp[_num] : shape_mod = tmp[_num].map(item => Number(item) - 1);
				} 
				else {
					shape_mod = tmp[_num];
				}
			} 
			else if ( _ID == 1 ) {  // line
				var tmp = [
					[arr[0] + 9, arr[1] + 0, arr[2] - 9],
					[arr[0] - 9, arr[1] + 0, arr[2] + 9],
				];
				<!-- _num == 0 ? shape_mod = tmp[_num++] : shape_mod = tmp[_num--];		 -->
				_num == 0 ? tmp[_num++] : tmp[_num--];
				
				if ( gameValidate(left_wall) == 0 ) {
					var j = 0;
					tmp[_num].forEach( (item) => {
						if ( leftBorder(left_wall).findIndex ( (el) => el == item ) != -1 ) {
							j++;
						} 
					});

					j == 3 ? shape_mod = tmp[_num] : shape_mod = tmp[_num].map(item => Number(item) + 1);
				} 
				else if ( gameValidate(right_wall) == 0 ) {
					var j = 0;
					tmp[_num].forEach( (item) => {
						if ( rightBorder(right_wall).findIndex ( (el) => el == item ) != -1 ) {
							j++;
						} 
					});

					j == 3 ? shape_mod = tmp[_num] : shape_mod = tmp[_num].map(item => Number(item) - 1);
				} 
				else {
					shape_mod = tmp[_num];
				}					
			} 
			else if ( _ID == 2 ) { // Zuu
				var tmp = [
					[arr[0] + 2, arr[1] + 10, arr[2] + 1, arr[3] + 9],
					[arr[0] - 2, arr[1] - 10, arr[2] - 1, arr[3] - 9],
				];
				<!-- _num == 0 ? shape_mod = tmp[_num++] : shape_mod = tmp[_num--];	 -->
				_num == 0 ? tmp[_num++] : tmp[_num--];	
				
				if ( gameValidate(left_wall) == 0 ) {
					var j = 0;
					tmp[_num].forEach( (item) => {
						if ( leftBorder(left_wall).findIndex ( (el) => el == item ) != -1 ) {
							j++;
						} 
					});

					j == 4 ? shape_mod = tmp[_num] : shape_mod = tmp[_num].map(item => Number(item) + 1);
				} 
				else if ( gameValidate(right_wall) == 0 ) {
					var j = 0;
					tmp[_num].forEach( (item) => {
						if ( rightBorder(right_wall).findIndex ( (el) => el == item ) != -1 ) {
							j++;
						} 
					});

					j == 4 ? shape_mod = tmp[_num] : shape_mod = tmp[_num].map(item => Number(item) - 1);
				} 
				else {
					shape_mod = tmp[_num];
				}
			} 
			else if ( _ID == 3 ) { // Rectangle
				shape_mod = arr;
			} 
			else if ( _ID == 4 ) { // L
				var tmp = [
					[arr[0] +  2, arr[1] +  9, arr[2] +  0, arr[3] -  9],		
					[arr[0] -  1, arr[1] +  1, arr[2] + 10, arr[3] + 10], 					 
					[arr[0] +  9, arr[1] +  0, arr[2] -  9, arr[3] -  2],				
					[arr[0] - 10, arr[1] - 10, arr[2] -  1, arr[3] +  1] 	
				];

				_num++;
				if ( _num == 4 ) {
					_num = 0;
				}
				
				if ( gameValidate(left_wall) == 0 ) {
					var j = 0;
					tmp[_num].forEach( (item) => {
						if ( leftBorder(left_wall).findIndex ( (el) => el == item ) != -1 ) {
							j++;
						} 
					});

					j == 4 ? shape_mod = tmp[_num] : shape_mod = tmp[_num].map(item => Number(item) + 1);
				} 
				else if ( gameValidate(right_wall) == 0 ) {
					var j = 0;
					tmp[_num].forEach( (item) => {
						if ( rightBorder(right_wall).findIndex ( (el) => el == item ) != -1 ) {
							j++;
						} 
					});

					j == 4 ? shape_mod = tmp[_num] : shape_mod = tmp[_num].map(item => Number(item) - 1);
				} 
				else {
					shape_mod = tmp[_num];
				}
			} 
			else if ( _ID == 5 ) { // Zuu revers
				var tmp = [
					[arr[0] + 11, arr[1] + 2, arr[2] + 9, arr[3]],
					[arr[0] - 11, arr[1] - 2, arr[2] - 9, arr[3]],
				];
				<!-- _num == 0 ? shape_mod = tmp[_num++] : shape_mod = tmp[_num--];	 -->
				_num == 0 ? tmp[_num++] : tmp[_num--];	
				
				if ( gameValidate(left_wall) == 0 ) {
					var j = 0;
					tmp[_num].forEach( (item) => {
						if ( leftBorder(left_wall).findIndex ( (el) => el == item ) != -1 ) {
							j++;
						} 
					});

					j == 4 ? shape_mod = tmp[_num] : shape_mod = tmp[_num].map(item => Number(item) + 1);
				} 
				else if ( gameValidate(right_wall) == 0 ) {
					var j = 0;
					tmp[_num].forEach( (item) => {
						if ( rightBorder(right_wall).findIndex ( (el) => el == item ) != -1 ) {
							j++;
						} 
					});

					j == 4 ? shape_mod = tmp[_num] : shape_mod = tmp[_num].map(item => Number(item) - 1);
				} 
				else {
					shape_mod = tmp[_num];
				}

			} 
			else if ( _ID == 6 ) { // L revers
				var tmp = [
					[arr[0] - 1, arr[1] - 1, arr[2] - 9, arr[3] - 9],		
					[arr[0] + 1, arr[1] - 8, arr[2] + 0, arr[3] + 9], 					 
					[arr[0] + 9, arr[1] + 9, arr[2] + 1, arr[3] + 1],				
					[arr[0] - 9, arr[1] + 0, arr[2] + 8, arr[3] - 1] 	
				];
				
				_num++;
				if ( _num == 4 ) {
					_num = 0;
				}
				
				if ( gameValidate(left_wall) == 0 ) {
					var j = 0;
					tmp[_num].forEach( (item) => {
						if ( leftBorder(left_wall).findIndex ( (el) => el == item ) != -1 ) {
							j++;
						} 
					});

					j == 4 ? shape_mod = tmp[_num] : shape_mod = tmp[_num].map(item => Number(item) + 1);
				} 
				else if ( gameValidate(right_wall) == 0 ) {
					var j = 0;
					tmp[_num].forEach( (item) => {
						if ( rightBorder(right_wall).findIndex ( (el) => el == item ) != -1 ) {
							j++;
						} 
					});

					j == 4 ? shape_mod = tmp[_num] : shape_mod = tmp[_num].map(item => Number(item) - 1);
				} 
				else {
					shape_mod = tmp[_num];
				}
			}
		}
		

		
		document.addEventListener('keydown', function(event) 
		{
			if (event.code == 'ArrowLeft') {
			
				oneLeftShape(shape_mod);
			} 
			else if (event.code == 'ArrowRight') {
			
				oneRightShape(shape_mod);
			} 
			else if (event.code == 'ArrowUp') {
			
				rotateShape(shape_mod, _ID);
			} 
			else if (event.code == 'ArrowDown') {
				
				_speed = 10;
			} 
			else if (event.code == 'Space') {
				if ( timeoutId !== undefined ) {
					clearTimeout(timeoutId);
					finishGame( '<h1>PAUSE</h1>' );
					timeoutId = undefined;
				} else {
					clearInterval( intervalId );
					document.getElementById('container').style.backgroundColor = 'white';
					document.getElementById('notefication').innerHTML = '';
					document.querySelector('.point').style.color = 'black';
					setTimeout( drawShape, _speed );
				}
			}
		});	