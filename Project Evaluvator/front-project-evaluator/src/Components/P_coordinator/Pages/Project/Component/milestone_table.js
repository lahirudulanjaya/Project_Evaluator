
import React,{Component} from 'react'
import {addmilstones} from '../../../../../actions/milestoneActions'
import {connect} from 'react-redux'

class Products extends React.Component {

    constructor(props) {
      super(props);
  
      //  this.state.products = [];
      this.state = {
        Milestones:[],
        products:[]
      };
      this.state.filterText = "";
      this.state.products = [
        {
          id: 1,
          name: 'football',
          MilstoneType:'',
          Markspresentatge: 12,
          Grp_or_I: 'Group',
          Duration:''
        }
      ];
  
    }
    handleUserInput(filterText) {
      this.setState({filterText: filterText});
    };
    handleRowDel(product) {
      var index = this.state.products.indexOf(product);
      this.state.products.splice(index, 1);
      this.setState(this.state.products);
    };
  
    handleAddEvent(evt) {
      this.setState({Milestones:[]})
      var id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
      var product = {
        id: id,
        name: "",
        Grp_or_I: "",
        Markspresentatge: 0,
        Duration:"",
        MilstoneType:""
      }
      this.state.products.push(product);
      this.setState(this.state.products);
      this.state.Milestones.push(this.state.products);
      console.log(this.state.products)
    }
    importMilestones=()=>{
      const newdetatil={
        Milestones :this.state.products
    }
    console.log(newdetatil)
      this.props.addmilstones(newdetatil)
    }
  
    handleProductTable(evt) {
      var item = {
        id: evt.target.id,
        name: evt.target.name,
        value: evt.target.value
      };
  var products = this.state.products.slice();
    var newProducts = products.map(function(product) {
  
      for (var key in product) {
        if (key == item.name && product.id == item.id) {
          product[key] = item.value;
  
        }
      }
      return product;
    });
      this.setState({products:newProducts});
    //  console.log(this.state.products);
    };
    render() {
  
      return (
        <div>
          <SearchBar filterText={this.state.filterText} onUserInput={this.handleUserInput.bind(this)}/>
          <ProductTable onProductTableUpdate={this.handleProductTable.bind(this)} onRowAdd={this.handleAddEvent.bind(this)} onRowDel={this.handleRowDel.bind(this)} products={this.state.products} filterText={this.state.filterText}/>
        <button onClick={this.importMilestones}>Add Milestone</button>
        </div>
      );
  
    }
  
  }
  class SearchBar extends React.Component {
    handleChange() {
      this.props.onUserInput(this.refs.filterTextInput.value);
    }
    render() {
      return (
        <div>
  
          <input type="text" placeholder="Search..." value={this.props.filterText} ref="filterTextInput" onChange={this.handleChange.bind(this)}/>
  
        </div>
  
      );
    }
  
  }
  
  class ProductTable extends React.Component {
    
 
   
  
    render() {
      
      var onProductTableUpdate = this.props.onProductTableUpdate;
      var rowDel = this.props.onRowDel;
      var filterText = this.props.filterText;
      var product = this.props.products.map(function(product) {
        if (product.name.indexOf(filterText) === -1) {
          return;
        }
        return (<ProductRow onProductTableUpdate={onProductTableUpdate} product={product} onDelEvent={rowDel.bind(this)} key={product.id}/>)
      });
      return (
        <div>
          <div class="form-group pt-3">
            <label for="projectSelect">Select Project</label>
            <div className="row">
              <div className="col-md-4">
              <select class="form-control" id="projectSelect">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
              </div>
              </div>
            </div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>name</th>
                <th>Milestone Type</th>
                <th>marks Presentage</th>
                <th>Group or Individual</th>
                <th>Time duration(Weeks)</th>
              </tr>
            </thead>
  
            <tbody>
              {product}
  
            </tbody>
  
          </table>
          <button type="button" onClick={this.props.onRowAdd} className="btn btn-success pull-right">Add</button>
          


        </div>
      );
  
    }
  
  }
  
  class ProductRow extends React.Component {
    onDelEvent() {
      this.props.onDelEvent(this.props.product);
    }
    render() {
  
      return (
        <tr className="eachRow">
          <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
            "type": "name",
            value: this.props.product.name,
            id: this.props.product.id
          }}/>
          
            <EditableCell  onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
            type:"MilstoneType",
            value: this.props.product.MilstoneType,
            id: this.props.product.id
          }}>
            </EditableCell>

          <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
            type: "Markspresentatge",
            value: this.props.product.Markspresentatge,
            id: this.props.product.id
          }}/>
          <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
            type: "Grp_or_I",
            value: this.props.product.Grp_or_I,
            id: this.props.product.id
          }}/>
           
           
           <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
            type: "Duration",
            value: this.props.product.Duration,
            id: this.props.product.id
            
          }}
          />
          <td className="del-cell">
            <input type="button" onClick={this.onDelEvent.bind(this)} value="X" className="del-btn"/>
          </td>
        </tr>
        
               
      );
  
    }
  
  }
  class EditableCell extends React.Component {
   
    render() {
      return (
        
        <td>
          <input type='text' name={this.props.cellData.type} id={this.props.cellData.id} value={this.props.cellData.value} onChange={this.props.onProductTableUpdate}/>
        </td>
      
      );
  
    }
  
  }
export default connect(null,{addmilstones})(Products);  
