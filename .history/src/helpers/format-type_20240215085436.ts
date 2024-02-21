const formatType = (type: string): string => {
    let color: string;
  
    switch (type) {
      case 'fire': 
        color = 'red lighten-1'; 
        break; 
      case 'water': 
        color = 'blue lighten-1'; 
        break; 
      case 'grass': 
        color = 'green lighten-1'; 
        break; 
      case 'bug': 
        color = 'brown lighten-1'; 
        break; 
      case 'normal': 
        color = 'grey lighten-3'; 
        break; 
      case 'flying': 
        color = 'blue lighten-3'; 
        break; 
      case 'poison': 
        color = 'deep-purple accent-1'; 
        break; 
      case 'fairy': 
        color = 'pink lighten-4'; 
        break; 
      case 'psy': 
        color = 'deep-purple darken-2'; 
        break; 
      case 'electric': 
        color = 'lime accent-1'; 
        break; 
      case 'fighting': 
        color = 'deep-orange'; 
        break; 
      default: 
        color = 'grey'; 
        break; 
    }
  
    return `chip ${color}`;
  }
  

export default formatType;