var roleBuilder = require ('role.builder');

module.exports = {
    run:function (creep) {


        if (creep.memory.working == true && creep.carry.energy == 0)
        {
            creep.memory.working = false;
        }

        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity)
        {
            creep.memory.working = true;
        }

        if (creep.memory.working == true)
        {
            var structure = creep.pos.findClosestByRange(FIND_MY_STRUCTURES,
                {
                    filter: (s) =>     (s.structureType == STRUCTURE_SPAWN
                || s.structureType == STRUCTURE_EXTENSION
                || s.structureType == STRUCTURE_TOWER)
                && s.energy < s.energyCapacity
        });

            if (structure != undefined) {


                if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure);
                }
            }
        }
        else
        {
            var container= creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (s) =>     s.structureType ==STRUCTURE_CONTAINER
        });
            var energy = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
            if (creep.pickup(energy) == ERR_NOT_IN_RANGE)
            {
                creep.moveTo(energy);
            }
            else if(creep.withdraw(container,RESOURCE_ENERGY)== ERR_NOT_IN_RANGE)
            {
                var source = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: (structure) => {return structure.structureType == STRUCTURE_CONTAINER
                    && structure.store[RESOURCE_ENERGY]  >= (creep.carryCapacity - _.sum(creep.carry)) * .6
                    }
            });

                if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            }
        }
    }
};