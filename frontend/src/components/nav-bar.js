import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Nav, NavItem, NavLink } from 'reactstrap';

import {getSortedCategoriesArray} from '../utils/helpers';

class NavBar extends Component {   

    render() {
        const {categories} = this.props
        const categoriesArray = getSortedCategoriesArray(categories);

        return (            
            <Nav>
                <NavItem>
                    <NavLink href="/">Home</NavLink>
                </NavItem>    
                <NavItem>
                    <NavLink href="/">All Posts</NavLink>
                </NavItem>
                <NavItem>                    
                <NavLink href="#">Categories</NavLink>
                    <ul>
                        <li>
                            <NavLink href='/'>All</NavLink>
                        </li>                                              
                        {categoriesArray &&
                            categoriesArray.length > 0 &&
                            categoriesArray.map(category =>
                            <li key={category.path}>
                                <NavLink href={`/${category.name}`}>
                                    {category.name}
                                </NavLink>
                            </li>
                        )}
                    </ul>              
                </NavItem>
            </Nav>           
        );
    };
}

function mapStateToProps({ categories}) {
    return { categories }
}

export default connect(mapStateToProps)(NavBar);
