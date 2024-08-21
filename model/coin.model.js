const mongoose=require('mongoose')

const coinSchema=mongoose.Schema({
    coins: { type: Number, default: 0 },

},{ timestamps: true })

const coinModel=mongoose.model('coims',coinSchema)

module.exports=coinModel
