import React from 'react';
import s from './ArticleElements.module.css';

class Picture extends React.Component {
    state = {
        media: "",
    }
    componentDidMount(prevProps) {
        if (this.props.media !== null) {
            this.setState({ media: this.props.media });
        }
        else
            this.setState({ media: "" });
    }
    deleteElement = (position) => {
        this.props.deleteElement(position);
    }
    editElement = (elementId) => {
        this.props.editElement(elementId, this.state.media, this.props.type);
    }

    onTextChange = (e) => {
        this.setState({
            media: e.currentTarget.value
        })
    }

    render() {
        return (
            this.props.editMode ?
                <div>
                    <div className={s.elementHeader}>
                        <i className="fa fa-trash-o" aria-hidden="true" onClick={() => { this.deleteElement(this.props.id) }}></i>
                        <i className="fa fa-arrows" aria-hidden="true"></i>
                        <h2>Picture</h2>
                    </div>
                    <input defaultValue={this.state.media} placeholder={"http://"} onChange={this.onTextChange} onBlur={() => { this.editElement(this.props.id) }} />
                </div>
                : this.state.media ?
                    <div className={s.picture}>
                        <img src={this.state.media} />
                    </div>
                    : null 
        );
    }
}
export default Picture;
