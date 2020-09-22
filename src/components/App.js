import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (event) => {
      this.setState(
        {
          filters: Object.assign({} ,this.state.filters , {type : event.target.value})
        }
      )
    }

    onFindPets = () => {
      let url = "/api/pets" ;

      if (this.state.filters.type !=="all") {
        url += `?type=${this.state.filters.type}`;
      }
         fetch(url).then(Response => Response.json())
                   .then(json => this.setState({pets : json})) ;
    }
    adoptPet = (id)=> {
        let pets= this.state.pets.map(pet => {
          if(id === pet.id ) {
            return Object.assign(pet,{isAdopted: true })
          }
       });
        this.setState({ pets: pets });
    }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
            <Filters
                             onChangeType ={this.onChangeType}
                             onFindPetsClick={this.onFindPets} />            </div>
            <div className="twelve wide column">
            <PetBrowser
                            pets={this.state.pets}
                            onAdoptPet={this.adoptPet} />            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
