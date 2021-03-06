import React from 'react';
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItem from '@material-ui/core/ListItem'
import List from '@material-ui/core/List'
import DragHandleIcon from '@material-ui/icons/DragHandle';
import MemoryIcon from '@material-ui/icons/Memory';
import DashboardIcon from '@material-ui/icons/Dashboard';
import VideocamIcon from '@material-ui/icons/Videocam';
import KeyboardIcon from '@material-ui/icons/Keyboard';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import MouseIcon from '@material-ui/icons/Mouse';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import ListSubheader from '@material-ui/core/ListSubheader'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import Card from '@material-ui/core/Card'
import {connect} from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import {ExpandLess, ExpandMore, StarBorder} from "@material-ui/icons";
import Collapse from "@material-ui/core/Collapse";
import FilterListIcon from '@material-ui/icons/FilterList';
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

class Products extends React.Component {
    constructor() {
        super();
        this.state = {
            items: {},
            open: false,
            selectedComponent: "motherboards",
            filters: {}
        }
    }

    componentDidMount() {
        this.loadData() // un fel de mounted care face incarcarea datelor
    }

    getFilter = () => {
        const filter = {}
        for (const item of this.props.cart) {
            if (item.type === "motherboards") {
                filter.Motherboard = item.product.socket
                filter.Ram = item.product.memoryType
            }
            if (item.type === "processors") {
                filter.Processor = item.product.socket
            }
            if (item.type === "ram") {
                filter.Ram = item.product.memoryType
            }
        }
        return Object.entries(filter)
    }

    filteredItems = () => {
        const items = Object.assign({}, this.state.items)
        const processorIndex = this.props.cart.findIndex(item => item.type === 'processors')
        const motherboardIndex = this.props.cart.findIndex(item => item.type === 'motherboards')
        const ramIndex = this.props.cart.findIndex(item => item.type === 'ram')

        if (processorIndex !== -1) {
            const processor = this.props.cart[processorIndex].product

            items.motherboards = items.motherboards.filter(item => item.socket === processor.socket)
        }

        if (motherboardIndex !== -1) {
            const motherboard = this.props.cart[motherboardIndex].product

            items.processors = items.processors.filter(item => item.socket === motherboard.socket)
            items.ram = items.ram.filter(item => item.memoryType === motherboard.memoryType)
        }

        if (ramIndex !== -1) {
            const ram = this.props.cart[ramIndex].product

            items.motherboards = items.motherboards.filter(item => item.memoryType === ram.memoryType)
        }

        return items
    }

    expandFilter = () => {
        this.setState({
            open: !this.state.open
        })
    }

    loadData = async () => {
        this.setState({
            items: (await import("../server/components.json")).default // incarcam json
        })
    }
    // cind apasam pe element punem in state elementrul pe care am facut click
    changeList = (selectedComponent) => {
        this.setState({
            selectedComponent
        })
    }
//adaugarea in store\ cos
    addToCart = (product) => {
        this.props.addToCart({
            product,
            type: this.state.selectedComponent
        })
    }

    render() {
        return (
            <div className="grid">
                <div>
                    <List
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                                Components
                            </ListSubheader>
                        }>
                        <ListItem onClick={() => this.changeList("motherboards")} button>
                            <ListItemIcon>
                                <DashboardIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Motherboards"/>
                        </ListItem>
                        <ListItem onClick={() => this.changeList("processors")} button>
                            <ListItemIcon>
                                <MemoryIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Processors"/>
                        </ListItem>
                        <ListItem onClick={() => this.changeList("ram")} button>
                            <ListItemIcon>
                                <DragHandleIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Ram"/>
                        </ListItem>
                        <ListItem onClick={() => this.changeList("rom")} button>
                            <ListItemIcon>
                                <DonutLargeIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Rom"/>
                        </ListItem>
                        <ListItem onClick={() => this.changeList("videocards")} button>
                            <ListItemIcon>
                                <VideocamIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Videocards"/>
                        </ListItem>
                        <ListItem onClick={() => this.changeList("monitors")} button>
                            <ListItemIcon>
                                <DesktopWindowsIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Monitors"/>
                        </ListItem>
                        <ListItem onClick={() => this.changeList("mouses")} button>
                            <ListItemIcon>
                                <MouseIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Mouses"/>
                        </ListItem>
                        <ListItem onClick={() => this.changeList("keyboards")} button>
                            <ListItemIcon>
                                <KeyboardIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Keyboards"/>
                        </ListItem>
                        {
                            this.getFilter().length
                                ? <>
                                    <ListItem button onClick={this.expandFilter}>
                                        <ListItemIcon>
                                            <FilterListIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary="Filters"/>
                                        {this.state.open ? <ExpandLess/> : <ExpandMore/>}
                                    </ListItem>
                                    <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            {this.getFilter().map(([index, item], key) => (
                                                <ListItem key={key} button>
                                                    <ListItemIcon>
                                                        <StarBorder/>
                                                    </ListItemIcon>
                                                    <ListItemText primary={index}/>
                                                    <ListItemSecondaryAction>
                                                        {item.toUpperCase()}
                                                    </ListItemSecondaryAction>
                                                </ListItem>
                                            ))}
                                        </List>
                                    </Collapse>
                                </>
                                : ""
                        }
                    </List>
                </div>
                <div className="second-grid">
                    {/*itemi filtrati in dependenta de ce item ales*/}

                    {this.filteredItems()[this.state.selectedComponent]?.map((item, key) =>
                        <Card key={key}>
                            <CardContent>
                                <img src={require("../" + item.image)} className="image-product"/>
                                <Typography variant="h5" component="h2">
                                    {item.name}
                                </Typography>
                                <Typography color="textSecondary">
                                    {item.description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Typography color="textSecondary">
                                    {item.price} $
                                </Typography>

                                <IconButton onClick={() => this.addToCart(item)} edge="start" color="inherit">
                                    <ShoppingCartIcon className="icon-add-cart"/>
                                </IconButton>
                            </CardActions>
                        </Card>
                    )}
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        cart: state.cart
    }),
    dispatch => ({
        addToCart: (product) => {
            dispatch({type: "ADD_PRODUCT", payload: product})
        }
    })
)(Products);
;
