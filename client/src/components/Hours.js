import React, { Component } from 'react';



class Hours extends Component {
    render() {
        return (
            <div style = {{
                backgroundColor: 'dodgerblue',
                position:'fixed',
               
                left: '0',
                width:'100%',
                height:'100%'
               


            }}>
            <div style = {{
                backgroundColor: 'lightcyan',
                width: '50%',
                height: '100%',
                justifyContent:'center',
                alignItems:'center',
                margin: '0 auto', 
                fontSize: 50
                

            }}>
            
                <h1 style={{fontSize: "100px"}}>Coffee Shop Community Library</h1>
           <img src="http://images.amazon.com/images/P/1552041778.01.LZZZZZZZ.jpg"></img>
            <table>
<tr><th>Sunday</th><td>Closed</td></tr>
<tr><th>Monday</th><td>9am - 5pm</td></tr>
<tr><th>Tuesday</th><td>9am - 5pm</td></tr>
<tr><th>Wednesday</th><td>9am - 5pm</td></tr>
<tr><th>Thursday</th><td>9am - 5pm</td></tr>
</table>
         </div>
         </div>
        );
    }
}

export default Hours;
