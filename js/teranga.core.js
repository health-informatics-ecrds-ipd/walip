function error(msg){
	$.blockUI({
	 	onOverlayClick: $.unblockUI,
	 	css: {
	 		'border-color'         : 'rgba(225, 0, 0, 0)',
            'padding'              : '25px',
            'opacity'              : '1',
            'background-color'     : 'rgba(255, 0, 0, 0)',
            'color'                : 'white',
            'text-shadow'          : 'px px 1px white',
            'font-weight'          : 'bold',
            'font-size'            : '35px',
            'display'              : 'inline-block',
            'width'                : 'fit-content',
            'text-align'           : 'left',
            'font-family'          : '"Trebuchet MS","Lucida Grande","Lucida Sans Unicode","Lucida Sans","Tahoma,sans-serif"'
        },
        message: msg
    });
}

function wait(){
	$.blockUI({
	 	onOverlayClick: $.unblockUI,
	 	css: {
            'border-color'         : 'rgba(225, 0, 0, 0)',
            'padding'              : '25px',
            //'-webkit-border-radius': '40px',
            //'-moz-border-radius'   : '40px',
            'opacity'              : '1',
            'background-color'     : 'rgba(255, 0, 0, 0)',
            //'color'                : 'black',
            'color'                : 'white',
            'text-shadow'          : 'px px 1px white',
            'font-weight'          : 'bold',
            'font-size'            : '55px',
            'display'              : 'inline-block',
            'width'                : 'fit-content',
            'text-align'           : 'left',
            'font-family'          : '"Trebuchet MS","Lucida Grande","Lucida Sans Unicode","Lucida Sans","Tahoma,sans-serif"'
        },
        message: "PLEASE WAIT..."
    });
}


function validate(evt) {
  var theEvent = evt || window.event;

  // Handle paste
  if (theEvent.type === 'paste') {
      key = event.clipboardData.getData('text/plain');
  } else {
  // Handle key press
      var key = theEvent.keyCode || theEvent.which;
      key = String.fromCharCode(key);
  }
  var regex = /[0-9]|\./;
  if( !regex.test(key) ) {
    theEvent.returnValue = false;
    if(theEvent.preventDefault) theEvent.preventDefault();
  }
}
