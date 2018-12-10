class NewQuiz extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      content: '',
      answer: '',
      message: '',
      alertStatus: 'success'
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleQuestion = this.handleQuestion.bind(this)
  }

  componentDidMount() {
    this._getData();
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    axios.post('/api/v1/questions/'+this.state.id+'/answer', {
      answer: this.state.answer
    }).then(response => {
      if (response.status == 200) {
        if(response.data.message =='CORRECT'){
          this.setState({alertStatus: 'success'});
        }else{
          this.setState({alertStatus: 'warning'});
        }
        this.setState({message: response.data.message});
      } else {
        this.setState({message: 'There is a problem, please try again.'});
      }
    }).catch(error => console.log(error));
  }

  handleQuestion(){
    this._getData();
  }

  _getData(){
    axios.get('/api/v1/questions/random')
    .then(response => {
      this.setState({id: response.data.id, content: response.data.content, answer: response.data.answer})
    }).catch(error => console.log(error))
  }

  render() {
    return (
      <div className="col-sm-6">
        <h1>Quiz!!!</h1>
          { this.state.message != "" ?
            <div className={"alert alert-"+this.state.alertStatus} role="alert">
              {this.state.message}
            </div>
            : ''
          }
        <div className="form-group">
          <label>Content</label>
          <input type="text" name="content" value={this.state.content} className="form-control" onChange={this.handleChange}/>
        </div>
        <div className="form-group">
          <label>Answer</label>
          <input type="text" name="answer" placeholder="Puts Your Answer" className="form-control" onChange={this.handleChange}/>
        </div>
        <input type="submit" value="Check Your Answer" className="btn btn-primary" onClick={this.handleSubmit}/>
        <span>     </span>
        <input type="button" value="Try Other Question" className="btn btn-primary" onClick={this.handleQuestion}/>
    </div>)
  }
}
