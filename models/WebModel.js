const { Schema, model } = require('mongoose')

const schema = new Schema({
	name:[
		{
			lang:String,
			name:String
		}
	],
	logo: String,
	slider: [
		{
			name:String,
			image:String,
			btnName:String,
			action:String,
			text:String
		}
	],
	menu: {
		type: Schema.Types.ObjectId,
		ref: 'Menu',
	},
	gallery: [
		{
			title:String,
			image:String
		}
	],
	breakingNews:[
		{
			title:String,
			url:String
		}
	],
	countDailyVisitors:Number,
	notice:{
		type:String,
		trim:true,
	},
	latestNews:{
		title:String,
		text:String,
		date:String
	},
	departments:[
		{
			name:String,
			title:String,
			text:String,
			date:{
				date:String,
				month:String,
				year:String
			},
			numberDate:String,
			image:String
		}
	],
	referenceLinks:[
		{
			name:String,
			url:String 
		}
	],
	documentsLinks:[
		{
			name:String,
			document:String,
			option:String, 
		}
	],
	socialLinks: [
		{
			name:String,
			action:String,
			icon:String,
			color:String
		}
	],
	futuredLinks:[
		{
			name:String,
			url:String
		}
	],
	aboutOfAdmin:[
		{
			image:String,
			name:String,
			title:String,
			subtitle:String,
			bio:String
		}
	],
	aboutOfTeacher:[
		{
			title:String,
			user:[
				{
					name:String,
					qualifications:String,
					bio:String,
					socialLinks:{
						facebook:String,
						phone:String,
						email:String
					}
				}
			]
		}
	],
	about:{
		title:{
			type:String,
			trim:false
		},
		body:{
			type:String,
			trim:false
		}
	},
	missionAndvission:{
		title:String,
		text:String,
	},
	libray:{
		title:String,
		text:String,
	},
})

const WebModel = new model('WebModel', schema)

module.exports = WebModel
