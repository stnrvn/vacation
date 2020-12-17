const {Subdistrict,Citizen,Admin} = require('../models/index')


class DistrictController{

    static getRoot(req,res){
        res.render('login')
    }

    static getDistrictList(req,res){
        Subdistrict.findAll()
        .then(data=>{
            res.render('districtList',{data})
        })
        .catch(err=>{
            res.send(err.stack)
        })  
    }

    static formAdd(req,res){
        res.render('addDistrict')
    }

    static addDistrict(req,res){
        let district = {
            name : req.body.name,
            chief : req.body.chief
        }
        Subdistrict.create(district)
        .then(data=>{
            res.redirect('/districts')
        })
        .catch(err =>{
            res.send(err)
        })
    }
    
    static formEdit(req,res){
        let id = +req.params.id
        Subdistrict.findOne({where : {id}}) 
        .then(data =>{
            res.render('editDistrict', {data})
        })
        .catch(err =>{
            res.send(err.stack)
        })
    }

    static editDistrict(req,res){
        let id = +req.params.id
        let district = {
            name : req.body.name,
            chief : req.body.chief,
        }
        Subdistrict.update(district,{where:{id}})
        .then(data =>{
            res.redirect('/districts')
        })
        .catch(err =>{
            res.send(err.stack)
        })
    }

    static deleteDistrict(req,res){
        let id = +req.params.id
        Subdistrict.destroy({where : {id}})
        .then(data =>{
            res.redirect('/districts')
        }).catch(err =>{
            res.send(err.message)
        })
    }

    static listCiti(req,res){
        let citizen
        Citizen.findAll({include: Subdistrict})
        .then(data=>{
            citizen = data
            let id = +req.params.id
            return Subdistrict.findByPk(id,{include: Citizen})
        }).then(data=>{
            res.render('addCiti',{citizen,data})
        }).catch(err=>{
            res.send(err.stack)
        })

    }

    static addCiti(req,res){
        let admin = {
            CitizenId: +req.body.cast,
            SubdistrictId: +req.params.id,
        }
        Admin.create(admin)
        .then(data=>{
            res.redirect(`/districts/addCiti/ ${+req.params.id}`)
        }).catch(err=>{
            res.redirect(err.stack)
        })
    }
}

module.exports = DistrictController