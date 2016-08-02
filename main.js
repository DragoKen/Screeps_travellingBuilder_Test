require('prototype.spawn')();
require('prototype.spawnHauler')();
require('prototype.spawnHarvester')();

var roleHarvester = require('role.harvester');
var roleHauler = require('role.hauler');


module.exports.loop = function ()
{

    for (let name in Memory.creeps)
    {
        if (Game.creeps[name] == undefined)
        {
            for (let flagName in Game.flags)
            {
                if (Game.creeps[name].memory.destination == flagName)
                {
                    Game.flags[flagName].memory.beingMined = false;
                }
            }
            delete  Memory.creeps[name];
        }
    }

    for (let name in Game.creeps) {
        var creep = Game.creeps[name];

        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        else if (creep.memory.role == 'hauler')
        {
            roleHauler.run(creep);
        }
    }
    var myRoom = Game.spawns.Spawn1.room.name;
    var towers = Game.rooms[myRoom].find(FIND_STRUCTURES,
        {
            filter: (s) => s.structureType == STRUCTURE_TOWER
});
    for (let tower of towers)
    {
        var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (target != undefined)
        {
            tower.attack(target);
        }
    }
    var energySources = [];
    for (let flagName in Game.flags)
    {
        if (flagName.search('EnergySource') !== -1)
        {
            if (Game.flags[flagName].memory.beingMined == undefined)
            {
                Game.flags[flagName].memory.beingMined = false;
            }
            let flag = Game.flags[flagName];
            energySources.push(flag);

        }
    }




    var minimumNumberOfHarvesters = 2;
    var minimumNumberOfHaulers = 2;
    var numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
    var numberOfHaulers = _.sum(Game.creeps, (c) => c.memory.role == 'hauler');



     energySources.forEach( function(energySource)
     {
        if (energySource.memory.beingMined === false)
        {
            Game.spawns.Spawn1.createCustomHarvesterCreep(energySource, 'harvester');
        }
     });


    var energy = Game.spawns.Spawn1.room.energyCapacityAvailable;
    var name = undefined;


    if (numberOfHarvesters < minimumNumberOfHarvesters)
    {
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'harvester');

        if (name == ERR_NOT_ENOUGH_ENERGY && numberOfHarvesters == 0)
        {
            name = Game.spawns.Spawn1.createCustomCreep(Game.spawns.Spawn1.room.energyAvailable, 'harvester');
        }
    }
    else if (numberOfHaulers < minimumNumberOfHaulers)
    {
        name = Game.spawns.Spawn1.createCustomHaulerCreep(energy, 'hauler');
    }


};

/*
 Dropped energy code for an enclosed area


 var all_nrg_dropped = creep.room.lookForAtArea(LOOK_ENERGY, 1, 32, 29, 44, true);

 if (all_nrg_dropped.length > 0) {

 var nrg_dropped = creep.room.lookForAt(LOOK_ENERGY, all_nrg_dropped[0]['x'], all_nrg_dropped[0]['y']);

 if (creep.pickup(nrg_dropped[0]) == ERR_NOT_IN_RANGE) {

 creep.moveTo(nrg_dropped[0])

 }

 }*/