import React from 'react';
import PropTypes from 'prop-types';
import styles from './Subscription.scss';
import { Table, Col, Button, FormGroup, Form, Row } from 'react-bootstrap';
import { Input, Label, Select } from 'reactstrap';
import { Card, CardBody, CardFooter, CardHeader } from 'reactstrap';
import CommonServices from '../../Services/CommonServices';

// const Subscription = props => (
// 	<div>This is a component called Subscription.</div>
// );

// todo: Unless you need to use lifecycle methods or local state,
// write your component in functional form as above and delete
// this section. 
class Subscription extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			packageId: 0,
			packageName: '',
			caseCount: '',
			ListSubcription: [],
			validityInDays: '',
			amount: ''
		}
	}

	render() {
		debugger;
		console.log("ListSubcription", this.state.ListSubcription)
		return (

			<Card >
				<CardHeader>Subscriptions</CardHeader>
				<CardBody>
					<Form className="form-horizontal">
						<Row >
							{this.state.ListSubcription.map((variant, idx) => (


								<Col xs="12" md="4">
									<Row >


										<div class="col-md-12">
											<div class="orange-moon" >
												<h3 class="pcknm">{variant.packageName}</h3>


												<div class="text-center">
													<i class="fa fa-rupee pckrp" > </i> <span class="pckvl">{variant.amount} /-</span>
												</div>

												<Label className="pcklbl"> <i class="fa fa-check-circle chkcrl"></i> Case Count : {variant.caseCount} </Label>

												<Label className="pcklbl"> <i class="fa fa-check-circle chkcrl"></i> Validation : {variant.validityInDays} Days</Label>

												<div class="text-center">
													<Button className='pckbtn' size="lg" > BUY NOW </Button>
												</div>
											</div>
										</div>

									</Row>
								</Col>





							))}
						</Row>
					</Form>

				</CardBody>
				<CardFooter>
					<Row>
						<Col xs="12" md="6">

						</Col>
						<Col xs="12" md="6" style={{ textAlign: "right" }}>

						</Col>
					</Row>
				</CardFooter>
			</Card>










			// <Card>
			// 	<CardHeader>
			// 		<i className="fa fa-align-justify"></i>
			// 		Subscriptions
			// 	</CardHeader>
			// 	<CardBody>





			// 		<Form

			// 		className="form-horizontal">

			// 			<Row>
			// 				<Col xs="12" md="4">
			// 					<Row>

			// 							<div class="col-md-12">
			// 								<div class="ultra-voilet">
			// 									<h3 class="pcknm">silver</h3>

			// 									<div class="text-center">
			// 										<i class="fa fa-rupee pckrp" > </i> <span class="pckvl">500 /-</span>
			// 									</div>

			// 									<Label className="pcklbl"> <i class="fa fa-check-circle chkcrl"></i> Case Count : 50 </Label>

			// 									<Label className="pcklbl"> <i class="fa fa-check-circle chkcrl"></i> Validation : 30 Days</Label>

			// 									<div class="text-center">
			// 										<Button className='pckbtn' size="lg" > BUY NOW </Button>
			// 									</div>
			// 								</div>
			// 							</div>

			// 					</Row>
			// 				</Col>

			// 				<Col xs="12" md="4">
			// 					<Row>
			// 					<div class="col-md-12">
			// 								<div class=" orange-moon">
			// 									<h3 class="pcknm">Gold</h3>

			// 									<div class="text-center">
			// 										<i class="fa fa-rupee pckrp" > </i> <span class="pckvl">1,000 /-</span>
			// 									</div>

			// 									<Label className="pcklbl"> <i class="fa fa-check-circle chkcrl"></i> Case Count : 75 </Label>

			// 									<Label className="pcklbl"> <i class="fa fa-check-circle chkcrl"></i> Validation : 30 Days</Label>


			// 									<div class="text-center">
			// 										<Button className='pckbtn' size="lg" > BUY NOW </Button>
			// 									</div>
			// 								</div>
			// 							</div>

			// 					</Row>
			// 				</Col>

			// 				<Col xs="12" md="4">
			// 					<Row>
			// 							<div class="col-md-12">
			// 								<div class="cool-blues">
			// 									<h3 class="pcknm">Platinum</h3>

			// 									<div class="text-center">
			// 										<i class="fa fa-rupee pckrp" > </i> <span class="pckvl">1,500 /-</span>
			// 									</div>

			// 									<Label className="pcklbl"> <i class="fa fa-check-circle chkcrl"></i> Case Count : 100 </Label>

			// 									<Label className="pcklbl"> <i class="fa fa-check-circle chkcrl"></i> Validation : 30 Days</Label>

			// 									<div class="text-center">
			// 										<Button className='pckbtn' size="lg" > BUY NOW </Button>
			// 									</div>
			// 								</div>
			// 							</div>	
			// 					</Row>
			// 				</Col>



			// 			</Row>

			// 		</Form>



			// 	</CardBody>

			// 	<CardFooter>
			// 		<Row>
			// 			<Col xs="12" md="6">

			// 			</Col>
			// 			<Col xs="12" md="6" style={{ textAlign: "right" }}>

			// 			</Col>
			// 		</Row>
			// 	</CardFooter>
			// </Card>
		)
	}


	async componentDidMount() {
		await this.getListSubscription();

	}
	getListSubscription() {
		CommonServices.getData(`/package`).then((temp) => {
			debugger;
			console.log("Result======", temp)
			this.setState({
				ListSubcription: temp,
			})

			console.log(this.state);
		});
	}

}




const SubscriptionPropTypes = {
	// always use prop types!
};

Subscription.propTypes = SubscriptionPropTypes;

export default Subscription;
