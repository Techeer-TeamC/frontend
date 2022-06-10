import React from 'react';
import axios from 'axios';
import SearchMovie from '../components/SearchMovie';
// import "./Home.css";
import "./Search.css";


class Search extends React.Component {
  state = {
    isLoading: true,
    products: [],
    value: "",
    name: ""
  };


  getTest = async () => {
    console.log('search Movie');
    const search = this.state.value;
    try {
      if (search === "") {
        this.setState({products: [], isLoading: false})
      } else {
        const {data: {
          data
        }} = await axios.get('http://localhost:8080/api/v1/products/search/?page=0',{
          params:{
            keyword: search //검색 키워드를 params에 넣음
          }
        });
        console.log(data);
        this.setState({products: data, isLoading: false});
      }
    } catch (error) {
      console.log(error.response);
      console.log(error.response.status);
    }
  };

  componentDidMount() {
    //this.getSearchMovie();
    this.getTest();
  };

  handleChange = (e : any) => {
    //console.log(e.type + ":", e.target.value);
    this.setState({value: e.target.value});
  };

  handleSubmit = (e : any) => {
    //console.log(e.type + ":", this.state.value);
    e.preventDefault();
    //this.getSearchMovie();
    this.getTest();
  };

  render() {
    const {products, isLoading, name} = this.state;

    return (<section className="container">
      {
        isLoading
            ? (<div className="loader">
              <span className="loader__text">Loading..{this.state.name}</span>
            </div>)
            : (<form onSubmit={this.handleSubmit}>
              <div>
                <div className="input_div">
                  <h1>상품 검색</h1>
                  <input className="input_search" type="text" value={this.state.value} onChange={this.handleChange} placeholder="Search Something"/>
                </div>
                <div className="products">
                  {products && products.map(product => (<SearchMovie key={product.id} id={product.id} year="year" title={product.name} poster="https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/mbp14-spacegray-select-202110_GEO_KR?wid=1808&hei=1680&fmt=jpeg&qlt=90&.v=1647363032344" rating="rating" director="director" actor="actor"/>))}
                </div>
              </div>
            </form>)
      }
    </section>);
  }
}

export default Search;
