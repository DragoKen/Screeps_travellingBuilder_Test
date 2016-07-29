var roleUpgrader = require ('role.upgrader');

module.exports = {
    run:function (creep) {

        var destination = 'W43N8';
        var homeBase = 'W43N9';


        if (creep.memory.working == true && creep.carry.energy == 0) {
            creep.memory.working = false;
        }

        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }


        if (creep.memory.working == true && creep.room.name == homeBase) {
            var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);

            if (constructionSite != undefined) {
                if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(constructionSite);
                }

            }
            else {
                roleUpgrader.run(creep);
            }
        }
        if (creep.memory.working == true && creep.room.name != homeBase)
        {
            creep.moveTo(creep.pos.findClosestByPath(creep.room.findExitTo(homeBase)));
        }

        if (creep.room.name == destination && creep.memory.working == false)
        {
            var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
        if (creep.room.name != destination && creep.memory.working == false)   // Move to source room
        {
            creep.moveTo(creep.pos.findClosestByPath(creep.room.findExitTo(destination)));
        }
    }
}