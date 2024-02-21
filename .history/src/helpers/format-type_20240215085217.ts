const formatType = (type: string): string => {
    let color: string;
  
    switch (type) {
      case 'fire': 
        color = 'red lighten-1'; 
        break; 
      case 'Eau': 
        color = 'blue lighten-1'; 
        break; 
      case 'grass': 
        color = 'green lighten-1'; 
        break; 
      case 'Insecte': 
        color = 'brown lighten-1'; 
        break; 
      case 'Normal': 
        color = 'grey lighten-3'; 
        break; 
      case 'fly': 
        color = 'blue lighten-3'; 
        break; 
      case 'poison': 
        color = 'deep-purple accent-1'; 
        break; 
      case 'fary': 
        color = 'pink lighten-4'; 
        break; 
      case 'psy': 
        color = 'deep-purple darken-2'; 
        break; 
      case 'electrik': 
        color = 'lime accent-1'; 
        break; 
      case 'fight': 
        color = 'deep-orange'; 
        break; 
      default: 
        color = 'grey'; 
        break; 
    }
  
    return `chip ${color}`;
  }
  

export default formatType;