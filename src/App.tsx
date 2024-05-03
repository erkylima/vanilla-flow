
import './pages/Flow'

function Layout(): HTMLElement{
    var newDrawer = document.createElement('div');

    newDrawer.innerHTML = `
        <div>
            <flow-root></flow-root>    
        </div>
    `
    return newDrawer;
}


class AppRoot extends HTMLElement {   
  constructor() {
      super();
      this.render();
    }
  

    render() {
      this.innerHTML = `${Layout().innerHTML}` 
    }
    
}


customElements.define('app-root', AppRoot);