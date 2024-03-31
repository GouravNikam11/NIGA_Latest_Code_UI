import React from 'react';
import PropTypes from 'prop-types';
import styles from './Subscription.scss';
import { Table, Col, Button, FormGroup, Form, Row } from 'react-bootstrap';
import { Input, Label, Select } from 'reactstrap';
import { Card, CardBody, CardFooter, CardHeader } from 'reactstrap';
import CommonServices from '../../Services/CommonServices';
//const Razorpay = require('razorpay');
import Razorpay from 'razorpay';


// const Subscription = props => (
// 	<div>This is a component called Subscription.</div>
// );

// todo: Unless you need to use lifecycle methods or local state,
// write your component in functional form as above and delete
// this section. 
class Subscription extends React.Component {

	constructor(props) {
		super(props)
		this.handlePaymentSuccess = this.handlePaymentSuccess.bind(this);
		this.handlePayment = this.handlePayment.bind(this);
		this.state = {
			packageId: 0,
			packageName: '',
			caseCount: '',
			ListSubcription: [],
			validityInDays: '',
			amount: '',
			razorpay: null,


		}


	}





	componentDidMount() {
		this.getListSubscription();

	}


	handlePaymentSuccess(response) {
		// Handle payment success event
		console.log('Payment successful:', response);
	}


	handlePayment() {
		debugger
		if (this.state.razorpay) {
			this.state.razorpay.open();
		} else {
			console.error('Razorpay is not initialized yet.');
		}
	}

	OnBuyClick(variant) {
		console.log(variant)
		debugger
		const script = document.createElement('script');
		script.src = 'https://checkout.razorpay.com/v1/checkout.js';
		script.async = true;
		script.onload = () => {
			// Initialize Razorpay
			const razorpay = new window.Razorpay({
				key: 'rzp_live_WSDlLVrcCPFbEQ',
				amount: 1 * 100,
				name: 'Homeo Centrum',
				description: 'Payment For Docter Subscription',
				//image: '/your_logo.png',
				handler: this.handlePaymentSuccess,
				prefill: {
					name: 'John Doe',
					email: 'john@example.com',
					contact: '9876543210'
				},
				notes: {
					address: '123, Main Street, City, Country'
				},
				theme: {
					color: '#F37254'
				}
			});

			this.setState({ razorpay });
		};
		document.body.appendChild(script);
		setTimeout(() => {
			this.handlePayment();
		}, 1000);

	}


	// OnBuyClick(variant) {
	// 	// Make a request to your backend to generate the order ID
	// 	fetch(`http://api.homeocentrum.com/api/generate-order`, {
	// 		method: 'POST',
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 			// You may need to pass any authentication tokens or other necessary headers here
	// 		},
	// 		body: JSON.stringify({
	// 			// You can pass any necessary data to your backend to generate the order
	// 			variant: variant
	// 		})
	// 	})
	// 	.then(response => response.json())
	// 	.then(data => {
	// 		// Once you receive the order ID from your backend, use it in Razorpay configuration
	// 		const orderId = data.orderId;

	// 		// Load Razorpay script
	// 		const script = document.createElement('script');
	// 		script.src = 'https://checkout.razorpay.com/v1/checkout.js';
	// 		script.async = true;
	// 		script.onload = () => {
	// 			// Initialize Razorpay
	// 			const razorpay = new window.Razorpay({
	// 				key: 'rzp_live_WSDlLVrcCPFbEQ',
	// 				amount: 1 * 100,
	// 				name: 'Homeo Centrum',
	// 				description: 'Payment For Doctor Subscription',
	// 				handler: this.handlePaymentSuccess,
	// 				prefill: {
	// 					name: 'John Doe',
	// 					email: 'john@example.com',
	// 					contact: '9876543210'
	// 				},
	// 				notes: {
	// 					address: '123, Main Street, City, Country'
	// 				},
	// 				theme: {
	// 					color: '#F37254'
	// 				},
	// 				order_id: orderId // Pass the order ID here
	// 			});

	// 			this.setState({ razorpay });
	// 		};
	// 		document.body.appendChild(script);
	// 	})
	// 	.catch(error => {
	// 		console.error('Error generating order ID:', error);
	// 		// Handle error appropriately, e.g., show an error message to the user
	// 	});
	// }

	handlePaymentSuccess(paymentResponse) {
		// Handle payment success response from Razorpay
		console.log(paymentResponse);
	}

	// render() {
	// 	return (
	// 		<div>

	// 			<button onClick={() => this.OnBuyClick('your-variant')}>Buy Now</button>
	// 		</div>
	// 	);
	// }





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
													<Button className='pckbtn' size="lg" onClick={() => this.OnBuyClick(variant)}> BUY NOW </Button>
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


	// async componentDidMount() {
	// 	await this.getListSubscription();

	// }
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
