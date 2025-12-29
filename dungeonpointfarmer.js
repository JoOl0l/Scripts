var discord = "https://discord.com/api/webhooks/1455029236908822786/Wsu9Nj-eiS9mUXpVpeQO9C2i4CWwDHdo7chQHW1U3YfLktoH_nWgvGPT0E8kpCVDCQ2w"




function Autostart(){
updateHalloweenDropGump()
}

function FarmDraconic() {
    Orion.ClearIgnoreList('Umbrascale')
    if(!Orion.ScriptRunning('AlwaysRunning')){
    Orion.ToggleScript('AlwaysRunning')
    }
    Orion.BlockMoving(false)
   LetsGO()
    while (true) {
        Orion.ToggleScript('RepairEquippedItems')
        Orion.Wait(1400)
 if (Orion.GetPathArray(1915, 2688, 2).length == 0 || Orion.GetDistance(1915, 2688) > 50) {
           RecallToTrinsic()
        }
        Refill()
        var item = Orion.FindTypeEx(any, any).filter(function (part) {
        return Orion.Contains(part.Name(), "Of The Umbrascale");
        });
        if(item.length > 15){
        ProcessEventItems()
        }
        checkDungeonJournal()
        RecallToHouse()
        GetToDungeon()
        EnterDungeon()
        Scripts()
        Orion.SetGlobal('wait', '0')
        Orion.SetGlobal('next', '0')
        while (Orion.GetGlobal('next') == 0 && !Orion.DisplayTimerExists('reset')) {
        if(Orion.InJournal('The Umbrascale Dragons begin to retreat')){
        Orion.SetGlobal('next', '1')
        var elapsedTime = Shared.GetVar('elapsedTime') || "0h 0m 0s"; // Retrieve the total runtime
         var Dungeon = Orion.GetGlobal('Dungeon')
        addHalloweenMessage("Invasion in " + Dungeon + " has ended! " + elapsedTime);
        }
        if(Player.Weight() / Player.MaxWeight() >= 0.8){
        Orion.SetGlobal('next', '1')
        }
        Orion.Wait(100)
        }
        if(Orion.InJournal('The Umbrascale Dragons begin to retreat') || Orion.DisplayTimerExists('reset')){
        if(Orion.DisplayTimerExists('reset')){
        var delay = Orion.DisplayTimerGetTime('reset')
        } else {
        var delay = randomBetween(150000, 300000)
        Orion.AddDisplayTimer('reset', delay, 'UnderChar', 'Circle|Bar', 'Reset', 0, 25, '0xFFFFFF', 0xff, '0xFFFFFF')
        }
        Orion.SetGlobal('wait', '1')
        Orion.Wait(delay)
        } 
        Orion.Terminate('Rail')
         Orion.PauseScript('pullmobs')
         Orion.StopWalking()
                var rats = Orion.FindTypeEx('any', any, ground, 'mobile|live|ignoreself|ignorefriends|inlos', 6, 'gray|enemy|criminal|red').filter(function(ShadowWrought) {
            return Orion.Contains(ShadowWrought.Properties(), "Shadow-Wrought");
        });
        while(rats.length > 4){
        Orion.Wait(100)
         var rats = Orion.FindTypeEx('any', any, ground, 'mobile|live|ignoreself|ignorefriends', 6, 'gray|enemy|criminal|red').filter(function(ShadowWrought) {
            return Orion.Contains(ShadowWrought.Properties(), "Shadow-Wrought");
        });
        }
        Orion.PauseScript('KillRats')
        RecallToTrinsic()
        Orion.Terminate('all', "FarmDraconic|AlwaysRunning")
        ProcessEventItems()
         if(Orion.GetGlobal('wait') == 1){
        var delay = randomBetween(180000, 200000)
          Orion.AddDisplayTimer('reset', delay, 'UnderChar', 'Circle|Bar', 'Next Dungeon', 0, 25, '0xFFFFFF', 0xff, '0xFFFFFF')
        Orion.Wait(delay)
        }
    }
}

function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



function AlwaysRunning() {
    updateHalloweenDropGump()
    startRuntimeCounter();
    Orion.UseObject(backpack);
    while (true) {
        var x = Player.X()
        var y = Player.Y()
        updateElapsedTime();     
         if(!Orion.ScriptRunning('AntiGM')){
        Orion.ToggleScript('AntiGM', true)
        }   
        Orion.Wait(500)
        if(x == Player.X() && y == Player.Y() && isScriptStarted('Rail')){
        Orion.PauseScript('Rail')
        Orion.PauseScript('KillRats')
        if(Orion.GetGlobal('Dungeon') == 'Ankh'){
        Orion.WalkTo(x, y - 3, Player.Z(), 0)
        } else{
        Orion.WalkTo(x, y + 2, Player.Z(), 0)
        }
        EnterDungeon()
        Orion.ResumeScript('Rail')
        Orion.ResumeScript('KillRats')
        }
            if(!Orion.ScriptRunning('healthCheck')){
            Orion.ToggleScript('healthCheck')
            }
    }
}

function AntiGM() {
    var charName = Player.Name();
    var paramText1 = "username=" + charName + "&content=@here " + charName + " found a GM, need human confirmation!"; 
    while (true) {
        var startTime = Orion.Now();
        var msg = Orion.WaitJournal("GM |Seer |Counselor ", startTime, 0);
        Orion.Wait(1);     
        Orion.HttpPost(discord, paramText1);
        Orion.PlayWav('fileName');
        Orion.Wait(1000);
        Orion.PlayWav('fileName');
        Orion.Wait(1000);
        Orion.PlayWav('fileName');
        Orion.Wait(1000);
    }
}

function Refill() {
if(Orion.SkillValue('Healing') > 500){
Orion.WalkTo(1900, 2688, 10, 0, 255, 1)
Orion.Say('Bank')
Orion.Wait(800)
    var belt = Orion.FindTypeEx(0xA1F6, any, backpack)
    var bank = Player.BankSerial()
    if (belt.length) {
        while (!Orion.GumpExists('container', belt[0].Serial())) {
            Orion.OpenContainer(belt[0].Serial());
            Orion.Wait(200);
        }
        Orion.Wait(200)
        var count = Orion.Count(0x0E21, any, belt[0].Serial())
        if (count < 400 && Orion.Count(0x0E21, any, bank) != 0) {
            if (count != 0) {
                while (!Orion.Dragging()) {
                    Orion.DragItemType(0x0E21, any, belt[0].Serial());
                    Orion.Wait('200');
                }
                Orion.Wait('200');
                Orion.DropDraggedItem(bank);
                Orion.Wait('500');
            }
            while (!Orion.Dragging()) {
                Orion.DragItemType(0x0E21, any, bank, 1000);
                Orion.Wait('300');
            }
            Orion.Wait('200');
            Orion.DropDraggedItem(belt[0].Serial());
        }
    } else {
        var count = Orion.Count(0x0E21, any, backpack)
        if (count < 350 && Orion.Count(0x0E21, any, bank) != 0) {
            while (!Orion.Dragging()) {
                Orion.DragItemType(0x0E21, any, bank, 600 - count);
                Orion.Wait('300');
            }
            Orion.Wait('200');
            Orion.DropDraggedItem(backpack);
        }
    }
}
}


//--#Dungeon Checker

var dungeons = [
    "Fire",
    "Deceit",
//    "Terathan Keep",
    "Destard",
     "Blood",
     "Rock",
     "Ankh",
];

if(Orion.ShardName() == 'Drachenfels'){
var dungeons = [
  //  "Fire",
//    "Deceit",
//    "Terathan Keep",
 //   "Destard",
     "Blood",
     "Rock",
     "Ankh",
];
}

function checkDungeonJournal() {
    Orion.ClearJournal();
    Orion.WalkTo(1915 + Orion.Random(-2, 2), 2696 + Orion.Random(-1, 2), 11, 0, 255,1);

    var foundDungeons = []; // hier speichern wir alle gefundenen Dungeons

    while (true) {
        var Crier = Orion.FindTypeEx('any', any, ground, 'any', 40).filter(function(Trader) {
            return Orion.Contains(Trader.Properties(), "Town Crier");
        });
            var x = Crier[0].X();
            var y = Crier[0].Y();
            var z = Crier[0].Z();
            Orion.WalkTo(x + Orion.Random(-2, 2), y, z, 3, 255,1);

        for (var i = 0; i < dungeons.length; i++) {
            if (Orion.InJournal(dungeons[i], ' ', Crier[0].Serial())) {
                // Wenn dieser Dungeon noch nicht in der Liste ist, hinzufügen
                if (foundDungeons.indexOf(dungeons[i]) === -1) {
                    foundDungeons.push(dungeons[i]);
                    Orion.Print("Dungeon detected: " + dungeons[i]);
                }
            }
        }
        Orion.ClearJournal(); // leeren, damit doppelte Zeilen ignoriert werden

        // Wenn wir zwei Dungeons haben (Tram + Ilshenar), brechen wir ab
        if (foundDungeons.length) {
            break;
        }
        Orion.WalkTo(1915 + Orion.Random(-2, 2), 2696 + Orion.Random(-1, 2), 11, 0 , 255,1);
    }

    // Auswahl des Dungeons
    var Dungeon;
    if (foundDungeons.length === 1) {
        Dungeon = foundDungeons[0];
    } else if (foundDungeons.length >= 2) {
        Dungeon = foundDungeons[randomBetween(0, 1)];
    }

    // Ausgabe und Speicherung
    Orion.Print("Selected Dungeon: " + Dungeon);
    Orion.SetGlobal('Dungeon', Dungeon);
     var elapsedTime = Shared.GetVar('elapsedTime') || "0h 0m 0s"; // Retrieve the total runtime
    addHalloweenMessage(Dungeon + " is Invaded " + elapsedTime);
    return Dungeon;
}

//--#Get To Dungeon
function GetToDungeon() {
    if (Orion.GetGlobal('Dungeon') == 'Rock' || Orion.GetGlobal('Dungeon') == 'Blood' || Orion.GetGlobal('Dungeon') == 'Ankh') {
        var bone = Orion.FindTypeEx('0x9F74', any, 'ground', 'near', '25')
        if (bone.length) {
            var Bone = Orion.FindObject(bone[0].Serial());
            var x1 = Bone.X()
            var y1 = Bone.Y()
            var z1 = Bone.Z()
            Orion.WalkTo(x1, y1, z1, 1);
            while (!Orion.GumpExists('generic', bone[0].Serial())) {
                Orion.UseObject(bone[0].Serial());
                Orion.Wait(500)
            }
            if (Orion.GetGlobal('Dungeon') == "Rock") {
                if (Orion.WaitForGump(1000)) {
                    var gump0 = Orion.GetGump('last');
                    if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0x000023FD')) {
                        gump0.Select(Orion.CreateGumpHook(17));
                        Orion.Wait(100);
                    }
                }
            } else if(Orion.GetGlobal('Dungeon') == "Blood") {
                if (Orion.WaitForGump(1000)) {
                    var gump0 = Orion.GetGump('last');
                    if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0x000023FD')) {
                        gump0.Select(Orion.CreateGumpHook(6));
                        Orion.Wait(100);
                    }
                }
            } else{
            if (Orion.WaitForGump(1000))
	{
		var gump0 = Orion.GetGump('last');
		if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0x000023FD'))
		{
			gump0.Select(Orion.CreateGumpHook(9));
			Orion.Wait(100);
		}
	}
            }
        }
    } else {
      var crystall = Orion.FindTypeEx('0x468A',0x0A29, 'ground', 'near', '25')
        if (crystall.length) {
            var Ball = Orion.FindObject(crystall[0].Serial());
            var x1 = Ball.X()
            var y1 = Ball.Y()
            var z1 = Ball.Z()
            Orion.WalkTo(x1, y1, z1, 1);
            if (Orion.GetGlobal('Dungeon') == "Terathan Keep") {
                Orion.Say('dungeon fire')
            } else {
                Orion.Say('dungeon ' + Orion.GetGlobal('Dungeon'))
            }
        }
    }
    Orion.Wait(1400)
}
//--#Enter Dungeon
function EnterDungeon() {
 if (Orion.GetGlobal('Dungeon') == "Rock") {
        while(Orion.GetPathArray(1787, 568, 74, 0).length != 0){
        Orion.WalkTo(1787, 568, 74, 0)
        Orion.Wait(800)
        }
         while(Orion.GetPathArray(2188, 294, -27, 0).length != 0){
        Orion.WalkTo(2188, 294, -27, 0)
        }
    }
     if (Orion.GetGlobal('Dungeon') == "Ankh") {
        while(Orion.GetPathArray(349, 1427, 15, 0).length != 0){
        Orion.WalkTo(349, 1427, 15, 0)
        Orion.Wait(800)
        }
         while(Orion.GetPathArray(11, 872, -28, 0).length != 0){
        Orion.WalkTo(11, 872, -28, 0)
        }
         while(Orion.GetPathArray(394, 1587, -13, 0).length != 0){
        Orion.WalkTo(394, 1587, -13, 0)
        }
    }
     if (Orion.GetGlobal('Dungeon') == "Blood") {
        while(Orion.GetPathArray(1746, 1236, -30, 0).length != 0){
        Orion.WalkTo(1746, 1236, -30, 0)
        }
    }
    if (Orion.GetGlobal('Dungeon') == "Fire") {
        while(Orion.GetPathArray(2923, 3405, 6, 0).length != 0){
        Orion.WalkTo(2922, 3405, 6, 0)
        }
       while(Orion.GetPathArray(5757, 2906, 15, 0).length != 0) {
            Orion.WalkTo(5757, 2906, 15, 0)
        }
    }
    if (Orion.GetGlobal('Dungeon') == "Deceit") {
    while(Orion.GetPathArray(4111, 430, 5, 0).length != 0){
        Orion.WalkTo(4111, 430, 5, 0)
        }
    }
    if (Orion.GetGlobal('Dungeon') == "Terathan Keep") {
        Orion.WalkTo(2923, 3405, 6, 0)
        Orion.Wait(800)
        Orion.WalkTo(5792, 1415, 47, 0)
        Orion.Wait(1200)
        while(Orion.GetPathArray(5426, 3123, -80, 0).length != 0){
        Orion.WalkTo(5426, 3123, -80, 0)
        }
    }
    if (Orion.GetGlobal('Dungeon') == "Destard") {
    while(Orion.GetPathArray(1176, 2635, 0, 0).length != 0){
        Orion.WalkTo(1176, 2635, 0, 0)
        }
    }
    Orion.Wait(800)
    var POTION = Orion.FindTypeEx(0xA1E6, any, 'backpack');
    if(POTION.length && !Orion.BuffExists('0x5de4')){
    while(!Orion.BuffExists('0x5de4')){
    Orion.UseObject(POTION[0].Serial())
    Orion.Wait(100)
    }
    }
    Orion.ClearJournal()
   if(Orion.Count("0x3BB3|0x3BB4", any, backpack)){
    while(!Orion.InJournal('still feeling lucky') && !Orion.InJournal('again in about') && !Orion.InJournal('in about an hour') && !Orion.InJournal('minutes')){
    Orion.UseType("0x3BB3|0x3BB4", any, backpack)
    Orion.Wait(200)    
    }}
   Orion.ClearJournal()
   if(Orion.Count(0x44D5, any, backpack)){
     while(!Orion.InJournal('still feeling lucky') && !Orion.InJournal('again in about') && !Orion.InJournal('in about an hour') && !Orion.InJournal('minutes')){
    Orion.UseType(0x44D5, any, backpack)
        Orion.Wait(200)    
    }}
}

//--# Go Out Of Dungeon
function GoOutOfDungeon() {
 if (Orion.GetGlobal('Dungeon') == "Rock") {
        while(Orion.GetPathArray(2188, 33, -27, 0).length != 0){
        Orion.WalkTo(2188, 33, -27, 0)
        Orion.Wait(800)
        }
         while(Orion.GetPathArray(2188, 320, -7, 0).length != 0){
        Orion.WalkTo(2188, 320, -7, 0)
        Orion.Wait(800)
        }
        while(Orion.GetPathArray(2189, 320, -7, 0).length != 0){
        Orion.WalkTo(2189, 320, -7, 0)
        Orion.Wait(800)
        }
    }
     if (Orion.GetGlobal('Dungeon') == "Ankh") {
        while(Orion.GetPathArray(79, 1364, -46, 0).length != 0){
        Orion.WalkTo(79, 1364, -46, 0)
        }
    }
     if (Orion.GetGlobal('Dungeon') == "Blood") {
        while(Orion.GetPathArray(2114, 829, -11, 0).length != 0){
        Orion.WalkTo(2114, 829, -11, 0, 255, 1)
        Orion.Wait(800)
        }
         if(Player.Dead()){
         while(Orion.GetPathArray(1530, 1341, -3, 0).length != 0){
        Orion.WalkTo(1530, 1341, -3, 0, 255, 1)
        Orion.Wait(800)
        }
        }
    }
    if (Orion.GetGlobal('Dungeon') == "Fire") {
      if (Orion.GetPathArray(5702, 1320, 16, 0).length != 0) {
            Orion.WalkTo(5702, 1320, 16, 0)
            Orion.Wait(800)
        }
        Orion.WalkTo(5688, 1424, 38, 0)
    }
    if (Orion.GetGlobal('Dungeon') == "Deceit") {
        if (Orion.GetPathArray(5306, 650, 12, 0).length != 0) {
            Orion.WalkTo(5306, 650, 12, 0)
            Orion.Wait(800)
        }
        if (Orion.GetPathArray(5137, 649, 5, 0).length != 0) {
            Orion.WalkTo(5137, 649, 5, 0)
            Orion.Wait(800)
        }
        if (Orion.GetPathArray(5305, 532, 4, 0).length != 0) {
            Orion.WalkTo(5305, 532, 4, 0)
            Orion.Wait(800)
        }
        Orion.WalkTo(5188, 639, 0, 0)
    }
    if (Orion.GetGlobal('Dungeon') == "Terathan Keep") {
    while(Orion.GetPathArray(5341, 1598, 47, 0, 0).length != 0) {
        Orion.WalkTo(5341, 1598, 47, 0, 0)
        }
    }
    if (Orion.GetGlobal('Dungeon') == "Destard") {
        if (Orion.GetPathArray(5133, 985, 22, 0).length != 0) {
            Orion.WalkTo(5133, 985, 22, 0)
            Orion.Wait(800)
        }
        if (Orion.GetPathArray(5143, 797, 22, 0).length != 0) {
            Orion.WalkTo(5143, 797, 22, 0)
            Orion.Wait(800)
        }
        Orion.WalkTo(5242, 1007, 0, 0)
    }
    Orion.Wait(800)
}

//--# Go Out Of Dungeon1
function GoOutOfDungeon1() {
 var healer = Orion.FindTypeEx('0x0190|0x0002', any, ground, any, 14).filter(function(Summon) {
        return Orion.Contains(Summon.Properties(), "asdasdadcxcyc")
    });
  var healer1 = Orion.FindTypeEx('0x0190|0x0002', any, ground, any, 14).filter(function(Summon) {
        return Orion.Contains(Summon.Properties(), "asdasdadcxcyc")
    });
while(healer.length == 0 && healer1.length == 0){
 if (Orion.GetGlobal('Dungeon') == "Rock") {
        while(Orion.GetPathArray(2188, 33, -27, 0).length != 0){
        Orion.WalkTo(2188, 33, -27, 0)
        Orion.Wait(800)
        }
         while(Orion.GetPathArray(2188, 320, -7, 0).length != 0){
        Orion.WalkTo(2188, 320, -7, 0)
        Orion.Wait(800)
        }
        while(Orion.GetPathArray(2189, 320, -7, 0).length != 0){
        Orion.WalkTo(2189, 320, -7, 0)
        Orion.Wait(800)
        }
    }
     if (Orion.GetGlobal('Dungeon') == "Ankh") {
        while(Orion.GetPathArray(79, 1364, -46, 0).length != 0){
        Orion.WalkTo(79, 1364, -46, 0)
        }
    }
     if (Orion.GetGlobal('Dungeon') == "Blood") {
        while(Orion.GetPathArray(2114, 829, -11, 0).length != 0){
        Orion.WalkTo(2114, 829, -11, 0, 255, 1)
        Orion.Wait(1200)
        }
        if(Player.Dead()){
         while(Orion.GetPathArray(1530, 1341, -3, 0).length != 0){
        Orion.WalkTo(1530, 1341, -3, 0, 255, 1)
        Orion.Wait(800)
        }
        }
    }
    if (Orion.GetGlobal('Dungeon') == "Fire") {
      if (Orion.GetPathArray(5702, 1320, 16, 0).length != 0) {
            Orion.WalkTo(5702, 1320, 16, 0)
            Orion.Wait(800)
        }
        Orion.WalkTo(5688, 1424, 38, 0)
    }
    if (Orion.GetGlobal('Dungeon') == "Deceit") {
        if (Orion.GetPathArray(5306, 650, 12, 0).length != 0) {
            Orion.WalkTo(5306, 650, 12, 0)
            Orion.Wait(800)
        }
        if (Orion.GetPathArray(5137, 649, 5, 0).length != 0) {
            Orion.WalkTo(5137, 649, 5, 0)
            Orion.Wait(800)
        }
        if (Orion.GetPathArray(5305, 532, 4, 0).length != 0) {
            Orion.WalkTo(5305, 532, 4, 0)
            Orion.Wait(800)
        }
        Orion.WalkTo(5188, 639, 0, 0)
    }
    if (Orion.GetGlobal('Dungeon') == "Terathan Keep") {
    while(Orion.GetPathArray(5341, 1598, 47, 0, 0).length != 0) {
        Orion.WalkTo(5341, 1598, 47, 0, 0)
        }
    }
    if (Orion.GetGlobal('Dungeon') == "Destard") {
        if (Orion.GetPathArray(5133, 985, 22, 0).length != 0) {
            Orion.WalkTo(5133, 985, 22, 0)
            Orion.Wait(800)
        }
        if (Orion.GetPathArray(5143, 797, 22, 0).length != 0) {
            Orion.WalkTo(5143, 797, 22, 0)
            Orion.Wait(800)
        }
        Orion.WalkTo(5242, 1007, 0, 0)
    }
    Orion.Wait(800)
 var healer = Orion.FindTypeEx('0x0190|0x0002', any, ground, 'near', 14 , 'yellow')
  var healer1 = Orion.FindTypeEx('0x0190|0x0002', any, ground, any, 14).filter(function(Summon) {
        return (Orion.Contains(Summon.Properties(), "Wandering Healer") || Orion.Contains(Summon.Properties(), "Ankh"));
    });
    }
}

//--#Recall
function RecallToHouse() {
      if (Orion.GetGlobal('Dungeon') == "Terathan Keep") {
      GoOutOfDungeon()
      }
      var x = Player.X()
    var y = Player.Y()
    while (true) {
        var RuneBooks = Orion.FindTypeEx(0x9C16, any, 'backpack', 'item');
        var RuneBook = RuneBooks.filter(function(item) {
            return item.Properties().toLowerCase().indexOf("main") !== -1;
        });
        if (RuneBook.length) {
            while(!Orion.GumpExists('generic', RuneBook[0].Serial())){
            Orion.UseObject(RuneBook[0].Serial());
            Orion.Wait(500)
            }
            Orion.Wait(200)
            if (Orion.WaitForGump(1400)) {
                var gump0 = Orion.GetGump('last');
                if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0x000001F2')) {
                    gump0.Select(Orion.CreateGumpHook(50000));
                    Orion.Wait(100);
                }
            }
            if (Orion.WaitForGump(1400)) {
                var gump1 = Orion.GetGump('last');
                if ((gump1 !== null) && (!gump1.Replayed()) && (gump1.ID() === '0x000001F2')) {
                    gump1.Select(Orion.CreateGumpHook(5000));
                    Orion.Wait(100);
                }
            }
            Orion.Wait(4000)
            if (x == Player.X() && y == Player.Y()) {
            Orion.Wait(1600)
            } else {
                Orion.BlockMoving(false)
                Orion.WarMode(0)
                Orion.Wait(100)
                var x = Player.X()
                var y = Player.Y()
                var z = Player.Z()
                Orion.WalkTo(x, y - 2, z, 0)
                Orion.Wait(800)
                return false;
            }
        }
        if (RuneBook.length == 0) {
            Orion.Print('No Main Runic Atlas Found')
        }
    }
}

function RecallToTrinsic() {
          if (Orion.GetGlobal('Dungeon') == "Terathan Keep") {
      GoOutOfDungeon()
      }
    var x = Player.X()
    var y = Player.Y()
    while (true) {
        var RuneBooks = Orion.FindTypeEx(0x9C16, any, 'backpack', 'item');
        var RuneBook = RuneBooks.filter(function(item) {
            return item.Properties().toLowerCase().indexOf("main") !== -1;
        });
        if (RuneBook.length) {
            while(!Orion.GumpExists('generic', RuneBook[0].Serial())){
            Orion.UseObject(RuneBook[0].Serial());
            Orion.Wait(500)
            }
            Orion.Wait(200)
            if (Orion.WaitForGump(1400)) {
                var gump0 = Orion.GetGump('last');
                if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0x000001F2')) {
                    gump0.Select(Orion.CreateGumpHook(50001));
                    Orion.Wait(100);
                }
            }
            if (Orion.WaitForGump(1400)) {
                var gump1 = Orion.GetGump('last');
                if ((gump1 !== null) && (!gump1.Replayed()) && (gump1.ID() === '0x000001F2')) {
                    gump1.Select(Orion.CreateGumpHook(5000));
                    Orion.Wait(100);
                }
            }
            Orion.Wait(4000)
            if (x == Player.X() && y == Player.Y()) {
            Orion.Wait(1600)
            } else {
                return false;
            }           
        }
        if (RuneBook.length == 0) {
            Orion.Print('No Main Runic Atlas Found')
        }
    }
}
//--#Samp Module
function Scripts() {
    Orion.ToggleScript("Specials", true);
    Orion.ToggleScript("AutoEverything", true);
    Orion.ToggleScript("KillRats", true);
    if(!Orion.ScriptRunning("healthCheck")){
    Orion.ToggleScript("healthCheck", true);
    }
    Orion.ToggleScript("CheckDurability", true);
    Orion.ToggleScript("Walk", true);
    Orion.ToggleScript("AutoInsure", true);
    Orion.ToggleScript("addGreenToFriendsList", true);
    if (Orion.SkillValue('healing', 'base') >= 600) {
        Orion.ToggleScript("AutoHealing", true);
    }
}

function Walk() {
    Orion.ClearBadLocations()
    Orion.RemoveTimer('mobs')
    while (true) {
        if (Orion.InJournal('appears to be locked')) {
            BadLocationInFront()
            Orion.ClearJournal('appears to be locked')
        }
        if (isScriptPaused('Rail')) {
            if (Orion.IsWalking()) {
                Orion.Wait(1500)
                var mobs = Orion.FindTypeEx('!0x033D|!0x00A4', '-1', 'ground', 'mobile|ignorefriends|inlos', 3, 'gray|criminal|orange|red').filter(function(Summon) {
                    return !Orion.Contains(Summon.Properties(), "summoned");
                });
                while (mobs.length == 0 && !Orion.InJournal('appears to be locked')) {
                    Orion.Wait(100)
                    var mobs = Orion.FindTypeEx('!0x033D|!0x00A4', '-1', 'ground', 'mobile|ignorefriends|inlos', 3, 'gray|criminal|orange|red').filter(function(Summon) {
                        return !Orion.Contains(Summon.Properties(), "summoned");
                    });
                }
                if (Orion.IsWalking()) {
                    Orion.StopWalking()
                }
            }
        }
        if(Orion.GetGlobal('next') == 0){
        var rats = Orion.FindTypeEx('any', any, ground, 'mobile|live|ignoreself|ignorefriends', 18, 'gray|enemy|criminal|red').filter(function(ShadowWrought) {
            return Orion.Contains(ShadowWrought.Properties(), "Shadow-Wrought") && ShadowWrought.Properties();
        });
        var rats = rats.sort(function(a, b) {
            return Orion.GetDistance(a.Serial()) - Orion.GetDistance(b.Serial());
        });
        Orion.UseIgnoreList('DynamicAttackIgnore');
        if (rats.length && Orion.TimerExists('mobs')) {
            Orion.RemoveTimer('mobs')
            Orion.Print('remove')
        }
        if (rats.length == 0 && !Orion.TimerExists('mobs')) {
            Orion.SetTimer('mobs')
            Orion.Print('set')
        }
        if (Orion.Timer('mobs') > 20000) {
            Orion.SetGlobal('next', '1')
            Orion.Print('Reset')
            Orion.RemoveTimer('mobs')
        }
        }
        Orion.Wait(100)
    }
}

function BadLocationInFront() {
    var dir = Player.Direction();
    var x = Player.X();
    var y = Player.Y();
    var z = Player.Z();

    // Bewegung abhängig von Richtung (0–7 normal, 128–135 beim Laufen)
    switch (dir) {
        // ---- Stehend/gehend ----
        case 0: y -= 1; break; // North
        case 1: x += 1; y -= 1; break; // NorthEast
        case 2: x += 1; break; // East
        case 3: x += 1; y += 1; break; // SouthEast
        case 4: y += 1; break; // South
        case 5: x -= 1; y += 1; break; // SouthWest
        case 6: x -= 1; break; // West
        case 7: x -= 1; y -= 1; break; // NorthWest

        // ---- Laufend ----
        case 128: y -= 1; break; // North (running)
        case 129: x += 1; y -= 1; break; // NorthEast (running)
        case 130: x += 1; break; // East (running)
        case 131: x += 1; y += 1; break; // SouthEast (running)
        case 132: y += 1; break; // South (running)
        case 133: x -= 1; y += 1; break; // SouthWest (running)
        case 134: x -= 1; break; // West (running)
        case 135: x -= 1; y -= 1; break; // NorthWest (running)
    }

    Orion.CharPrint(Player.Serial(), 0x0035, "Bad Location gesetzt bei: " + x + "," + y + "," + z);

    // Sicherheitsabfolge – pausiert laufende Skripte und markiert Location
    Orion.PauseScript('Rail|KillRats');
    Orion.Wait(100);
    Orion.StopWalking();
    Orion.Wait(100);

    // Bad Location hinzufügen (längerer Timeout = permanent)
    Orion.SetBadLocation(x, y, 9000000);

    // Zwei Schritte in Gegenrichtung laufen
    WalkOppositeDirection(dir, 2);

    Orion.ResumeScript('Rail|KillRats');
}

function WalkOppositeDirection(dir, steps) {
    var x = Player.X();
    var y = Player.Y();
    var z = Player.Z();

    for (var i = 0; i < steps; i++) {
        switch (dir) {
            // ---- Stehend/gehend ----
            case 0: y += 1; break; // opposite of North
            case 1: x -= 1; y += 1; break; // opposite of NE
            case 2: x -= 1; break; // opposite of East
            case 3: x -= 1; y -= 1; break; // opposite of SE
            case 4: y -= 1; break; // opposite of South
            case 5: x += 1; y -= 1; break; // opposite of SW
            case 6: x += 1; break; // opposite of West
            case 7: x += 1; y += 1; break; // opposite of NW

            // ---- Laufend ----
            case 128: y += 1; break; // opposite of North (running)
            case 129: x -= 1; y += 1; break; // opposite of NE (running)
            case 130: x -= 1; break; // opposite of East (running)
            case 131: x -= 1; y -= 1; break; // opposite of SE (running)
            case 132: y -= 1; break; // opposite of South (running)
            case 133: x += 1; y -= 1; break; // opposite of SW (running)
            case 134: x += 1; break; // opposite of West (running)
            case 135: x += 1; y += 1; break; // opposite of NW (running)
        }
        Orion.WalkTo(x, y, z, 0);
    }
}


function healthCheck() {
    while (true) {
        if (Player.Hits() < 60) {
            Orion.BlockMoving(false)
            Orion.PauseScript('KillRats')
            Orion.PauseScript('Rail')
            Orion.PauseScript('pullmobs')
            Orion.PauseScript('Walk')
            Orion.ToggleScript('GoOutOfDungeon1', true)
            while (!Player.Dead() && Player.Hits() < 60) {
                Orion.Wait(10)
                var rats = Orion.FindTypeEx('any', any, ground, 'mobile|live|ignoreself|ignorefriends', 18, 'gray|enemy|criminal|red').filter(function(ShadowWrought) {
            return Orion.Contains(ShadowWrought.Properties(), "Shadow-Wrought") && ShadowWrought.Properties();
        });
        var rats = rats.sort(function(a, b) {
            return Orion.GetDistance(a.Serial()) - Orion.GetDistance(b.Serial());
        });
        if(rats.length){
        Orion.Attack(rats[0].Serial())
        Orion.Wait(100)
        }
            }
            if (!Player.Dead()) {
            Orion.Wait(800)
            if(Orion.ScriptRunning('GoOutOfDungeon1')){
                Orion.ToggleScript('GoOutOfDungeon1', true)
                }
                Orion.BlockMoving(false)
                Orion.StopWalking()
                Orion.Wait(700)
                EnterDungeon()
                Orion.ResumeScript('all')
                Orion.Terminate('Rail')
            } else {
             addHalloweenMessage("Player is Dead! Going for Rezz");
            Orion.BlockMoving(false)
        	    incrementDeathCounter()
                Orion.Terminate('all', 'FarmDraconic|healthCheck')
                GoOutOfDungeon1()
                Orion.ToggleScript('resgump', true)
                Healer()
                while (Player.Dead()) {
                    Orion.Wait(10)
                }
                Orion.UseObject(backpack)
                Orion.Wait(800)                   
                 if (Orion.SkillValue('healing', 'base') >= 600) {
      			 Orion.ToggleScript("AutoHealing", true);
   				 }
                if (Orion.GetGlobal('Dungeon') == "Terathan Keep") {
                Orion.Dress('Main')
                Orion.WalkTo(5426, 3123, -80, 0)
                }
                DropDeathRobes()
                Remount()
                ReVamp()
                DropDeathRobes()
                Remount()
                while (Player.Hits() / Player.MaxHits() < 0.7 && !Player.Dead()) {
                if(Orion.SkillValue('Bushido') > 650){
                Orion.Cast('Confidence')
                }
                Orion.Wait(300)
                 }
                 if(!Player.Dead()){
                Orion.ToggleScript('AlwaysRunning')
                EnterDungeon()
                 if (Orion.SkillValue('healing', 'base') >= 600) {
        		Orion.ToggleScript("AutoHealing", true);
    			}
                Scripts()
                }
            }
        }
        Orion.Wait(100)
    }
}

function Healer() {
 var healer = Orion.FindTypeEx('0x0190|0x0002', any, ground, any, 14).filter(function(Summon) {
        return (Orion.Contains(Summon.Properties(), "Wandering Healer") || Orion.Contains(Summon.Properties(), "Ankh"));
    });
    if(healer.length){
    var x = healer[0].X()
    var y = healer[0].Y()
    var z = healer[0].Z()
    Orion.WalkTo(x, y, z, 1)
    }
 var healer1 = Orion.FindTypeEx('0x0190|0x0002', any, ground, 'near', 14 , 'yellow')
    if(healer1.length){
    var x = healer1[0].X()
    var y = healer1[0].Y()
    var z = healer1[0].Z()
    Orion.WalkTo(x, y, z, 2)
    }
}

function resgump() {
    while (true) {
        const amDead = Player.Dead()
        if (Orion.WaitForGump(1000)) {
            var gump0 = Orion.GetGump('last');
            if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0x000008AF')) {
                gump0.Select(Orion.CreateGumpHook(2));
                while (Orion.IsWalking()) {
                    Orion.StopWalking()
                    Orion.Wait(100)
                }
                Orion.Terminate('resgump')
            }

        }
        Orion.Wait(500);
    }
}

function ReVamp() {
    if (Orion.SkillValue('Necromancy', 'real') >= 990) {
        if (!Orion.BuffExists('vampiric embrace')) {
            while (Player.LRC() < 40 && !Player.Dead() ) {
                Orion.Dress('Lrc')
                Orion.Wait(500)
            }
            while (!Orion.BuffExists('vampiric embrace') && !Player.Dead()) {
                Orion.Cast('vampiric embrace')
                Orion.Wait(500)
            }
            while (Player.LRC() >= 40 && !Player.Dead()) {
                Orion.Dress('Main')
                Orion.Wait(500)
            }
        }
    }
    else{
     while (Player.MaxStam() < 150 && !Player.Dead()) {
                Orion.Dress('Main')
                Orion.Wait(200)
            }
    }
}

function DropDeathRobes() {
    while (Orion.DragItemType("0x1F03", '0x08FD') && !Player.Dead()) {
        Orion.Wait(500);
        Orion.DropDraggedItemRelative(Orion.Random(-1, 2), Orion.Random(-1, 2), 0);
        Orion.Wait(500);
    }
}

function Remount() {
    var items = Orion.FindTypeEx('-1', '-1', 'backpack'); // Use '-1' for any type and any color
    var Ethy = items.filter(function(item) {
        return Orion.Contains(item.Properties(), "Ethereal|Charger of|Rideable Polar Bear"); // Use Properties() if Name() is not available
    });
    var mount = Orion.FindTypeEx(any, any, ground, 'canchangename|nothuman|live', '10')
    if (Ethy.length > 0 && !Orion.BuffExists('dismount') && mount.length == 0) {
        Orion.Print("Found Ethereal Mount: " + Ethy[0].Name());
        Orion.UseObject(Ethy[0].Serial()); // Use the serial of the first found Ethereal mount
    }
    var mount = Orion.FindTypeEx(any, any, ground, 'canchangename|nothuman|live', '10')
    if (mount.length > 0 && !Orion.BuffExists('dismount')) {
        var Mount = mount[0].Serial()
        while (!Orion.ObjAtLayer('Mount') && Orion.BuffExists('dismount') && !Player.Dead() && mount.length) {
            var mount = Orion.FindTypeEx(any, any, ground, 'canchangename|nothuman|live', '10')
            Orion.Say('all follow me');
            Orion.Wait(2000)
        }
        while (!Orion.ObjAtLayer('Mount') && !Orion.BuffExists('dismount') && !Player.Dead() && mount.length) {
            var mount = Orion.FindTypeEx(any, any, ground, 'canchangename|nothuman|live', '10')
            Orion.Follow(Mount)
            Orion.UseObject(Mount);
            Orion.Wait(200)
        }
    }
}


function Specials() {
    // Define weapon behaviors
    var weapons = {
        0x0F4B: { // Double Axe
            single: {
                type: "ability"
                , name: "Primary"
            }, // Armor Ignore
            multi: {
                type: "ability"
                , name: "Secondary"
            } // Whirlwind Attack
        }
        , 0x1443: { // Bladed Staff
            single: {
                type: "spell"
                , name: "Momentum Strike"
                , manaRequired: 20
            }, // Momentum Strike
            multi: {
                type: "ability"
                , name: "Primary"
            } // Default to Primary
        }
        , 0x0DF0: { // Whip
            single: {
                type: "spell"
                , name: "Lightning Strike"
            }, // Lightning Strike
            multi: {
                type: "ability"
                , name: "Primary"
            } // Default to Primary
        }
         , 0xAEC2: { //Mace Hammer
             single: {
                type: "ability"
                , name: "Primary"
            }, // Armor Ignore
           multi: {
                type: "ability"
                , name: "Secondary"
            } // Whirlwind Attack
        }
        , 0x090A: { // Cyclone (Throwing)
            single: {
                type: "ability"
                , name: "Primary"
            }, // Single-target attack
            multi: {
                type: "ability"
                , name: "Primary"
            } // Default to Primary
        }
    };


    while (!Player.Dead()) {
        // Find nearby enemies
        var targets = Orion.FindTypeEx(any, any, "ground", "mobile|live|ignoreself|ignorefriends", 1, "gray|enemy|red|criminal").filter(function(Summon) {
            return !Orion.Contains(Summon.Properties(), "summoned");
        });
        if (!targets.length || (!Orion.ObjAtLayer('2') && !Orion.ObjAtLayer('1'))) {
            Orion.Wait(100); // Reduce CPU usage when no targets are available
            continue;
        }

        // Check for equipped weapon
        var leftHandWeapon = Orion.ObjAtLayer("LeftHand");
        var rightHandWeapon = Orion.ObjAtLayer("RightHand");
        var currentWeapon = leftHandWeapon || rightHandWeapon;

        // Extract weapon type and debug
        var weaponGraphic = currentWeapon.Graphic().toUpperCase(); // Ensure consistent string format
        // Convert graphic to numeric value for matching
        var numericGraphic = parseInt(weaponGraphic, 16);

        var weaponBehavior = weapons[numericGraphic];
        
        if (!weaponBehavior) {
            Orion.UseAbility("Primary", true); // Default to primary ability
        } else {
            // Determine action based on number of targets
            var target = targets[0]; // Target the closest mob
            Orion.Attack(target.Serial());

            var action = targets.length > 1 ? weaponBehavior.multi : weaponBehavior.single;

            if (action.type === "ability" && !Orion.SpellStatus('Onslaught')) {
                Orion.UseAbility(action.name, true);
            } else if (action.type === "spell" && Player.Mana() >= (action.manaRequired || 0) && !Orion.SpellStatus('Onslaught')) {
                Orion.Cast(action.name);
            }
        }

        // Wait between actions to avoid excessive resource usage
        Orion.Wait(150);
    }
}


function addGreenToFriendsList() {
    while (!Player.Dead()) {
        var GoodGuys = Orion.FindType('any', 'any', 'any', 'ignorefriends|ignoreself|live|human', 20, 'friendly');
        GoodGuys.forEach(function(serial) {
            var obj = Orion.FindObject(serial);
            if (obj) {
                Orion.AddFriend(obj.Name(), obj.Serial());
            }
        });
        Orion.Wait(500);
    }
}

function AutoEverything() {
    while (true) {
        var weaponObject = getWeaponFromHand('RightHand');
        if (!weaponObject)
            weaponObject = getWeaponFromHand('LeftHand');

        if (!weaponObject) {
            if (!Orion.BuffExists('0x754a')) {
                Orion.CreateClientMacro('EquipLastWeapon').Play(false, 1000);
                Orion.Wait(250);
            }
            Orion.Wait(20)
        }
        ///Rez
        while (Player.Dead()) {


        }

        ///Remount

        //Not Gargs
        if (Player.Race() !== '3') {
            var mount = Orion.FindTypeEx(any, any, ground, 'canchangename|nothuman|live', '10')
            if (!Orion.ObjAtLayer('Mount') && Player.Hits() > 80) {
                if (mount.length > 0) {
                    Orion.SetTimer('follow')
                    var Mount = mount[0].Serial()
                    if ((!Orion.ObjAtLayer('Mount') && Orion.BuffExists('dismount') && mount.length && Orion.Timer('follow') > 3000) || (mount[0].Distance() > 1 && Orion.Timer('follow') > 3000)) {
                        Orion.Say('all follow me');
                        Orion.SetTimer('follow')
                    }
                    while (!Orion.ObjAtLayer('Mount') && !Player.Dead() && !Orion.BuffExists('dismount') && Player.Hits() > 40 && mount.length && mount[0].Distance() < 2) {
                        var mount = Orion.FindTypeEx(any, any, ground, 'canchangename|nothuman|live', '10')
                        if (mount.length > 0 && mount[0] && Orion.ObjectExists(mount[0].Serial())) {
                        Orion.GetStatus(Mount)
                        if (mount[0].Poisoned()) {
                            Orion.CastTarget('Cleanse by fire', Mount)
                            Orion.WaitForTarget(1000)
                        } else {
                            Orion.UseObject(Mount);
                            Orion.Wait(200)
                        }}
                        Orion.Wait(20)
                    }
                }
                var items = Orion.FindTypeEx('-1', '-1', 'backpack'); // Use '-1' for any type and any color
                var Ethy = items.filter(function(item) {
                    return Orion.Contains(item.Properties(), "Ethereal|Charger of"); // Use Properties() if Name() is not available
                });

                if (Ethy.length > 0 && !Orion.ObjAtLayer('Mount') && !Orion.BuffExists('dismount') && mount.length == 0) {
                    Orion.UseObject(Ethy[0].Serial()); // Use the serial of the first found Ethereal mount
                    Orion.Wait(20)
                }
            }
        }

        //Gargs
        if (Player.Race() == '3') {
            while (!Orion.ObjAtLayer('Mount') && !Player.Dead() && !Orion.BuffExists('gargoyle fly') && Player.Hits() > 40 && !Orion.BuffExists('dismount')) {
                Orion.ToggleGargoyleFlying();
                Orion.Wait(100)
            }
        }

        ///Evasion

        if (Orion.SkillValue('bushido', 'base') > 600 && weaponObject && !Player.Frozen()) {
            while (Player.Hits() < Player.MaxHits() - 25 && !Player.Dead() && !Orion.DisplayTimerExists('evadetimer') && Player.Mana() > 5 && weaponObject) {
                var weaponObject = Orion.ObjAtLayer('RightHand');
                if (!weaponObject) weaponObject = Orion.ObjAtLayer('LeftHand');
                var mobs = Orion.FindTypeEx('!0x033D|!0x00A4', '-1', 'ground', 'mobile|ignorefriends|inlos', 12, 'gray|criminal|orange|red').filter(function(Summon) {
                    return !Orion.Contains(Summon.Properties(), "summoned");
                });
                if (mobs.length > 0) {
                    while (!Orion.BuffExists('Evasion') && weaponObject && !Player.Dead()) {
                        var weaponObject = Orion.ObjAtLayer('RightHand');
                        if (!weaponObject) weaponObject = Orion.ObjAtLayer('LeftHand');
                        Orion.Cast('Evasion');
                        Orion.Wait(40)
                    }
                }
                var timer = Orion.BuffTimeRemaining('Evasion') || 0;
                if (Orion.BuffExists('Evasion') && !Orion.DisplayTimerExists('evadetimer')) {
                    Orion.AddDisplayTimer('evadetimer', timer + 20000, 'UnderChar', 'Circle|Bar', 'Evade', 0, 25, '0xFFFFFF', 0xff, '0xFFFFFF')
                }
            }

            ///Counter Attack
            var mobs = Orion.FindTypeEx('!0x033D|!0x00A4', '-1', 'ground', 'mobile|ignorefriends|inlos', 12, 'gray|criminal|orange|red').filter(function(Summon) {
                return !Orion.Contains(Summon.Properties(), "summoned");
            });
            if (mobs.length > 0) {
                if (!Orion.BuffExists('Counter Attack') && Player.Mana() > 5 && !Orion.DisplayTimerExists('Confidence')) {
                    if (!Orion.BuffExists('Evasion')) {
                        Orion.Cast('Counter Attack');
                        Orion.Wait(20)
                    }
                    Orion.Wait(20)
                }
            }

            ///Confidence
            if (Player.Hits() < Player.MaxHits() * 0.75 && !Orion.DisplayTimerExists('Confidence') && !Orion.BuffExists('Evasion') && Player.Mana() > 5) { // Bushido 50.0 or above
                Orion.Cast('Confidence');
                Orion.Wait(200);
                if (Orion.BuffExists('Confidence')) {
                    Orion.AddDisplayTimer('Confidence', 4000, 'AboveChar', 'Circle|Bar', 'Confidence', -1, 25, '906', 0xff, '0xFFFFFF');
                }
            }
            Orion.Wait(20)
        }     
        Orion.Wait(50)
    }
}

function getWeaponFromHand(layer) {
    var item = Orion.ObjAtLayer(layer);
    if (!item)
        return null;

    var props = item.Properties();
    if (!props)
        return null;

    var lines = props.split('\n');
    for (var i = 0; i < lines.length; i++) {
        if (lines[i].indexOf("Skill Required") !== -1) {
            return item;
        }
    }
    return null;
}

function AutoHealing() {
    while (!Player.Dead()) {
        var belt = Orion.FindType('0xA1F6', -1, 'backpack');
        if (belt.length && !Player.Dead()) {
            beltSerial = belt[0];
            while (!Orion.GumpExists('container', beltSerial)) {
                Orion.OpenContainer(beltSerial);
                Orion.Wait(200);
            }
        }
        // Handle Poison if Healing Skill is Available
        if (Orion.BuffExists('0x755d') && !Orion.BuffExists('0x7596')) { // Poison active, not healing
            while (!Orion.BuffExists('0x7596') && Orion.BuffExists('0x755d')) {
                Orion.BandageSelf();
                Orion.Wait(10)
            }
            var timer = Orion.BuffTimeRemaining('0x7596')
            if (!Orion.DisplayTimerExists('Healing') && Orion.BuffExists('0x7596')) {
                Orion.AddDisplayTimer('Healing', timer, 'UnderChar', 'Circle|Bar', 'heal', -1, 25, '906', 0xff, '0xFFFFFF');
            }
        }

        // Heal Self if Healing Skill is Available
        if (Player.Hits() < Player.MaxHits() * 0.95 && !Orion.BuffExists('0x7596')) {
            while (!Orion.BuffExists('0x7596') && Player.Hits() < Player.MaxHits() * 0.95) {
                Orion.BandageSelf();
                Orion.Wait(10)
            }
            var timer = Orion.BuffTimeRemaining('0x7596')
            if (!Orion.DisplayTimerExists('Healing') && Orion.BuffExists('0x7596')) {
                Orion.AddDisplayTimer('Healing', timer, 'UnderChar', 'Circle|Bar', 'heal', -1, 25, '906', 0xff, '0xFFFFFF');
            }
        }
        if (Player.Hits() > Player.MaxHits() * 0.75) {
            var alliesSerials = {};
            // Friends
            var friends = Orion.GetFriendList();
            for (var i in friends) {
                alliesSerials[friends[i]] = true;
            }
            // Party Members
            var partyMembers = Orion.PartyMembers();
            for (var j in partyMembers) {
                alliesSerials[partyMembers[j]] = true;
            }
            // Grüne Charaktere im Umkreis
            var greens = Orion.FindTypeEx('any', '-1', 'ground', 'mobile|live|ignorefriends|inlos|human', 2, 'green');
            for (var k in greens) {
                var g = greens[k];
                if (g && g.Serial())
                    alliesSerials[g.Serial()] = true;
            }
            for (var serial in alliesSerials) {
                var obj = Orion.FindObject(serial);
                if (obj && obj.Exists()) {
                    Orion.GetStatus(serial);
                    if (obj.Hits('%') < 90 && Orion.GetDistance(obj.X(), obj.Y()) <= 2 && !Orion.BuffExists("healing skill") && !Orion.DisplayTimerExists('Healing')) {
                        Orion.Print('Bandaging Ally: ' + obj.Name());
                        while (!Orion.BuffExists('healing skill') && obj.Hits('%') < 90 && Orion.GetDistance(obj.X(), obj.Y()) <= 2) {
                            Orion.BandageTarget(serial);
                            Orion.Wait(10);
                        }
                        var timer = Orion.BuffTimeRemaining('healing skill');
                        if (!Orion.DisplayTimerExists('Healing') && Orion.BuffExists('healing skill')) {
                            Orion.AddDisplayTimer('Healing', timer, 'UnderChar', 'Circle|Bar', 'heal', -1, 25, '906', 0xff, '0xFFFFFF');
                        }
                    }
                }
                Orion.Wait(50);
            }
        }

    }
}



function AutoInsure() {
    while (!Player.Dead()) {
        var item = Orion.FindTypeEx(any, any).filter(function (part) {
            return (Orion.Contains(part.Name(), "Of The Umbrascale") && !part.Properties().match(/insured/i) && !part.Properties().match(/cursed/i));
        });        
        if (item.length) {
            Orion.RequestContextMenu(self);
            Orion.WaitContextMenuID(self, 418);
            Orion.WaitForTarget(1100);
            Orion.TargetObject(item[0].Serial());
            Orion.Wait(400)
            while(!Orion.WaitForTarget()){
            Orion.Wait(100)
             Orion.CancelTarget();
            }
            Orion.CancelTarget();
            Orion.Wait(500)
            if(item[0].Properties().match(/insured/i)){
            incrementTotalDrops();
            }
        }
        
        Orion.Wait(100);
    }
}

function pullmobs() {
    Orion.SetTimer('pull', 0)
    Orion.ClearIgnoreList('pull')
    while (true) {
        attackAllMobs()
        Orion.Wait(500)
        if (Orion.Timer('pull') > 20000) {
            Orion.ClearIgnoreList('pull')
            Orion.SetTimer('pull', 0)
        }
    }
}

function attackAllMobs() {
    // Find all hostile mobs on the screen
    var mobs = Orion.FindTypeEx(
        "any", "any", "ground", "mobile|live|ignoreself|ignorefriends|inlos", 40, // Max range for entire screen
        "gray|criminal|orange|red", // Target hostile mobs
        '-1', 'pull'
    ).filter(function(mob) {
        return !Orion.Contains(mob.Properties(), "summoned") && Orion.Contains(mob.Properties(), "Shadow-Wrought") && mob.Properties();
    });

    // Attack each mob once
    mobs.forEach(function(mob) {
        if (mob && Orion.ObjectExists(mob.Serial())) {
            Orion.Attack(mob.Serial());
            Orion.AddIgnoreListObject('pull', mob.Serial())
        }
        Orion.Wait(50)
    });

}


function EoO() {
    while (true) {
        if (Player.Mana() > 15) {
            var mobs = Orion.FindTypeEx('any', '!0x00D5|any', 'ground', 'mobile|ignorefriends|inlos', 5, 'gray|criminal|orange|red');
            var paraList = Orion.FindTypeEx('any', '0x0501', 'ground', 'mobile|ignorefriends|inlos', 5, 'gray|criminal|orange|red');

            if (paraList.length > 0) {
                var paraGraphic = paraList[0].Graphic();
                var allParagonsSame = true;

                // Prüfe, ob alle Paragons die gleiche Grafik haben
                for (var i = 1; i < paraList.length; i++) {
                    if (paraList[i].Graphic() !== paraGraphic) {
                        allParagonsSame = false;
                        break;
                    }
                }

                if (allParagonsSame) {
                    var allMobsSameAsParagon = true;
                    for (var j = 0; j < mobs.length; j++) {
                        if (mobs[j].Graphic() !== paraGraphic) {
                            allMobsSameAsParagon = false;
                            break;
                        }
                    }

                    // Nur wenn ALLE Paragons und ALLE Mobs dieselbe Grafik haben
                    if (allMobsSameAsParagon) {
                        if (!Orion.BuffExists('Enemy of One')) {
                            Orion.Cast('Enemy of One');
                            Orion.Wait(100);
                        }
                    } else {
                        if (Orion.BuffExists('Enemy of One')) {
                            Orion.Cast('Enemy of One'); // Buff aus
                            Orion.Wait(100);
                        }
                    }
                } else {
                    if (Orion.BuffExists('Enemy of One')) {
                        Orion.Cast('Enemy of One'); // Buff aus
                        Orion.Wait(100);
                    }
                }
            } else {
                // Kein Paragon da → Enemy of One aus, falls aktiv
                if (Orion.BuffExists('Enemy of One')) {
                    Orion.Cast('Enemy of One');
                    Orion.Wait(100);
                }
            }
        }
        Orion.Wait(50);
    }
}

function Consecrate_Weapon() {
    while (!Player.Dead()) {
        if (!Orion.BuffExists('Consecrate Weapon') && Player.Mana() > 15) {
            var mobs = Orion.FindType('!0x033D|!0x00A4', '-1', 'ground', 'mobile|ignorefriends|inlos', 12, 'gray|criminal|orange|red')
            if (mobs.length > 0) {
                Orion.Cast('Consecrate Weapon');
                Orion.Wait(300);
            }
            Orion.Wait(50)
        }
        Orion.Wait(50)
    }
}
//--#Rail and Attack

//Destard
 if (Orion.GetGlobal('Dungeon') == "Destard") {
var coords = [
    {x: 5141, y: 985, z: 0},
    {x: 5178, y: 1005, z: 0},
    {x: 5133, y: 985, z: 22},
    {x: 5244, y: 998, z: 0},
    {x: 5247, y: 941, z: -33},
    {x: 5313, y: 964, z: 0},
    {x: 5345, y: 944, z: 0},
    {x: 5286, y: 910, z: -40},
    {x: 5248, y: 887, z: 0},
    {x: 5184, y: 924, z: 1},
    {x: 5169, y: 947, z: 0},
    {x: 5143, y: 907, z: 0},
    {x: 5130, y: 908, z: -23, type: "teleDown"},
    ////Level2
    {x: 5143, y: 797, z: 22, type: "teleUp"},
    {x: 5143, y: 810, z: 0},
    {x: 5159, y: 842, z: 0},
    {x: 5154, y: 870, z: 0},
    {x: 5151, y: 810, z: -13 , type: "teleDown"},
    /////Level3
    {x: 5141, y: 985, z: 0},
    {x: 5178, y: 1005, z: 0},
    {x: 5133, y: 985, z: 22 , type: "teleUp"}
];
}
//Deceit
 if (Orion.GetGlobal('Dungeon') == "Deceit") {
var coords = [
{x: 5187,y: 628,z: 0},
{x: 5186,y: 600,z: 0},
{x: 5195,y: 595,z: 0},
{x: 5175,y: 595,z: 0},
{x: 5187,y: 579,z: 2},
{x: 5177,y: 553,z: 0},
{x: 5168,y: 563,z: 0},
{x: 5210,y: 558,z: -20},
{x: 5163,y: 541,z: -30},
{x: 5147,y: 589,z: -50},
{x: 5146,y: 618,z: -50},
{x: 5219,y: 543,z: 0},
{x: 5219,y: 577,z: 0},
{x: 5217, y: 586, z: -13, type: "teleDown"},
////////////////
 {x: 5305, y: 532, z: 4, type: "teleUp"},
 {x: 5306,y: 538,z: 0},
{x: 5330,y: 543,z: 0},
{x: 5286,y: 543,z: 0},
{x: 5287,y: 582,z: 0},
{x: 5319,y: 579,z: 0},
{x: 5323,y: 613,z: 0},
{x: 5295,y: 624,z: -5},
{x: 5339,y: 605,z: 0},
{x: 5344,y: 581,z: 0},
 {x: 5346, y: 578, z: 5, type: "teleDown"},
////////////////
 {x: 5137, y: 649, z: 5, type: "teleUp"},
 {x: 5139,y: 675,z: 0},
{x: 5150,y: 719,z: 0},
{x: 5154,y: 676,z: 0},
{x: 5155,y: 693,z: 0},
{x: 5188,y: 696,z: 2},
{x: 5182,y: 725,z: 0},
{x: 5194,y: 655,z: 0},
{x: 5227,y: 707,z: -20},
{x: 5220,y: 735,z: -20}, 
{x: 5219, y: 763, z: -26, type: "teleDown"},
 /////////
 {x: 5312,y: 674,z: 0},
{x: 5330,y: 705,z: 0},
{x: 5317,y: 749,z: -20},
{x: 5307,y: 691,z: 0},
{x: 5307,y: 663,z: 0},
 {x: 5306, y: 650, z: 12, type: "teleUp"},
];
}
//Fire
 if (Orion.GetGlobal('Dungeon') == "Fire") {
var coords = [
{x: 5689,y: 1420,z: 38},
{x: 5692,y: 1435,z: -2},
{x: 5744,y: 1435,z: 7},
{x: 5722,y: 1465,z: -1},
{x: 5758,y: 1427,z: 29},
{x: 5783,y: 1424,z: 39},
{x: 5789,y: 1477,z: 20},
{x: 5834,y: 1494,z: -2},
{x: 5837,y: 1468,z: 0},
{x: 5869,y: 1474,z: 0},
{x: 5861,y: 1419,z: 0},
{x: 5831,y: 1422,z: 0},
{x: 5830,y: 1401,z: -2},
{x: 5840,y: 1365,z: -1},
{x: 5814,y: 1331,z: -2},
{x: 5862,y: 1343,z: 3},
{x: 5849,y: 1310,z: 3},
{x: 5803,y: 1306,z: -11},
{x: 5772,y: 1301,z: 0},
{x: 5773,y: 1349,z: -2},
{x: 5787, y: 1335, z: -13, type: "teleDown"},
////////////////
{x: 5702,y: 1293,z: -3},
{x: 5753,y: 1302,z: 1},
{x: 5748,y: 1322,z: 2},
{x: 5722,y: 1334,z: -2},
{x: 5742,y: 1380,z: 8},
{x: 5722,y: 1385,z: -2},
{x: 5694,y: 1377,z: -3},
{x: 5656,y: 1363,z: -1},
{x: 5653,y: 1317,z: 1},
{x: 5687,y: 1301,z: 0},
 {x: 5702, y: 1320, z: 16, type: "teleUp"},
];
}
//Terra Keep
if (Orion.GetGlobal('Dungeon') == "Terathan Keep") {
var coords = [
{x: 5333,y: 1600,z: 0},
{x: 5356,y: 1614,z: 0},
{x: 5312,y: 1613,z: 0},
{x: 5321,y: 1647,z: 0},
{x: 5348,y: 1688,z: -51},
{x: 5346,y: 1719,z: -87},
{x: 5319,y: 1698,z: -23},
{x: 5294,y: 1715,z: -17},
{x: 5267,y: 1690,z: 0},
{x: 5213,y: 1695,z: -1},
{x: 5210,y: 1669,z: -1},
{x: 5167,y: 1705,z: -2},
{x: 5149,y: 1663,z: 0},
{x: 5141,y: 1626,z: 0},
{x: 5215,y: 1627,z: 0},
{x: 5226,y: 1588,z: 0},
{x: 5197,y: 1594,z: 0},
{x: 5182,y: 1612,z: 0},
{x: 5149,y: 1612,z: 0},
{x: 5134,y: 1566,z: 0},
{x: 5139,y: 1545,z: 0},
{x: 5173,y: 1546,z: 0},
{x: 5189,y: 1562,z: 0},
{x: 5163,y: 1577,z: -15},
{x: 5180,y: 1596,z: -15},
{x: 5208,y: 1563,z: 0},
{x: 5291,y: 1573,z: 0},
{x: 5301,y: 1557,z: 0},
{x: 5316,y: 1563,z: 0},
{x: 5313,y: 1590,z: 0},
{x: 5332,y: 1590,z: 0},
];
}

//Rock Dungeon
if (Orion.GetGlobal('Dungeon') == "Rock") {
var coords = [
{x: 5333,y: 1600,z: 0},
{x: 5356,y: 1614,z: 0},
{x: 5312,y: 1613,z: 0},
{x: 5321,y: 1647,z: 0},
{x: 5348,y: 1688,z: -51},
{x: 5346,y: 1719,z: -87},
{x: 5319,y: 1698,z: -23},
{x: 5294,y: 1715,z: -17},
{x: 5267,y: 1690,z: 0},
{x: 5213,y: 1695,z: -1},
{x: 5210,y: 1669,z: -1},
{x: 5167,y: 1705,z: -2},
{x: 5149,y: 1663,z: 0},
{x: 5141,y: 1626,z: 0},
{x: 5215,y: 1627,z: 0},
{x: 5226,y: 1588,z: 0},
{x: 5197,y: 1594,z: 0},
{x: 5182,y: 1612,z: 0},
{x: 5149,y: 1612,z: 0},
{x: 5134,y: 1566,z: 0},
{x: 5139,y: 1545,z: 0},
{x: 5173,y: 1546,z: 0},
{x: 5189,y: 1562,z: 0},
{x: 5163,y: 1577,z: -15},
{x: 5180,y: 1596,z: -15},
{x: 5208,y: 1563,z: 0},
{x: 5291,y: 1573,z: 0},
{x: 5301,y: 1557,z: 0},
{x: 5316,y: 1563,z: 0},
{x: 5313,y: 1590,z: 0},
{x: 5332,y: 1590,z: 0},
{x: 2188,y: 20,z: -32},
{x: 2219,y: 20,z: -27},
{x: 2235,y: 34,z: -32},
{x: 2207,y: 37,z: -32},
{x: 2195,y: 61,z: -32},
{x: 2236,y: 52,z: -30},
{x: 2201,y: 85,z: -30},
{x: 2224,y: 128,z: -32},
{x: 2191,y: 113,z: -32},
{x: 2189,y: 148,z: -32},
{x: 2185,y: 168,z: -32},
{x: 2219,y: 174,z: -32},
{x: 2228,y: 143,z: -32},
{x: 2168,y: 171,z: -30},
{x: 2128,y: 165,z: -32},
{x: 2112,y: 153,z: -32},
{x: 2172,y: 115,z: -32},
{x: 2126,y: 135,z: -32},
{x: 2106,y: 124,z: -27},
{x: 2123,y: 105,z: -32},
{x: 2104,y: 96,z: -27},
{x: 2094,y: 57,z: -32},
{x: 2124,y: 60,z: -27},
{x: 2127,y: 30,z: -27},
{x: 2152,y: 45,z: -30},
{x: 2155,y: 68,z: -32},
{x: 2185,y: 84,z: -32},
{x: 2173,y: 48,z: -27},
{x: 2154,y: 24,z: -32},
];
}

//Blood Dungeon
if (Orion.GetGlobal('Dungeon') == "Blood") {
var coords = [
{x: 2114,y: 841,z: -28},
{x: 2142,y: 844,z: -28},
{x: 2179,y: 839,z: -28},
{x: 2178,y: 859,z: -28},
{x: 2142,y: 868,z: -28},
{x: 2087,y: 845,z: -28},
{x: 2051,y: 839,z: -28},
{x: 2052,y: 860,z: -28},
{x: 2085,y: 869,z: -28},
{x: 2168,y: 889,z: -28},
{x: 2170,y: 950,z: -28},
{x: 2114,y: 952,z: -28},
{x: 2114,y: 1010,z: -28},
{x: 2079,y: 952,z: -28},
{x: 2058,y: 908,z: -28},
{x: 2084,y: 912,z: -28},
{x: 2115,y: 916,z: -23},
{x: 2144,y: 912,z: -28},
{x: 2114,y: 841,z: -28},
];
}

//Ankh Dungeon
if (Orion.GetGlobal('Dungeon') ==  "Ankh") {
var coords = [
{x: 82,y: 1378,z: -28}, 
{x: 74,y: 1409,z: -28}, 
{x: 33,y: 1411,z: -28}, 
{x: 52,y: 1369,z: -28}, 
{x: 15,y: 1371,z: -28}, 
{x: 51,y: 1346,z: -28}, 
{x: 51,y: 1322,z: -28},
 {x: 55,y: 1294,z: -28},
  {x: 52,y: 1268,z: -28}, 
  {x: 96,y: 1322,z: -28}, 
  {x: 52,y: 1363,z: -28}, 
  {x: 76,y: 1411,z: -28}, 
  {x: 114,y: 1435,z: -28}, 
  {x: 107,y: 1387,z: -28}, 
  {x: 130,y: 1410,z: -28}, 
  {x: 131,y: 1378,z: -28}, 
  {x: 131,y: 1328,z: -27}, 
  {x: 50,y: 1443,z: -28}, 
  {x: 34,y: 1443,z: -28}, 
  {x: 11,y: 1445,z: -28}, 
  {x: 11,y: 1466,z: -28}, 
  {x: 14,y: 1506,z: -28}, 
  {x: 35,y: 1465,z: -28},
   {x: 41,y: 1491,z: -28}, 
   {x: 59,y: 1491,z: -28},
    {x: 61,y: 1478,z: -28}, 
    {x: 83,y: 1491,z: -28}, 
    {x: 87,y: 1475,z: -28}, 
    {x: 70,y: 1519,z: -28}, 
    {x: 83,y: 1544,z: -28}, 
    {x: 85,y: 1562,z: -28}, 
    {x: 139,y: 1568,z: -28},
     {x: 119,y: 1552,z: -28}, 
     {x: 119,y: 1515,z: -28}, 
     {x: 160,y: 1523,z: -28}, 
     {x: 171,y: 1523,z: -28}, 
     {x: 115,y: 1507,z: -28}, 
     {x: 122,y: 1469,z: -28}, 
     {x: 154,y: 1490,z: -28}, 
     ]
}

function BadPoints() {
    Orion.SetBadLocation(5140, 973, 900000000)
    Orion.SetBadLocation(5145, 973, 900000000)
    Orion.SetBadLocation(5303, 699, 900000000)
    Orion.SetBadLocation(5172, 1588, 900000000)
    Orion.SetBadLocation(5188, 566, 900000000)
    Orion.SetBadLocation(5311, 603, 900000000)
Orion.SetBadLocation(5311, 604, 900000000)
Orion.SetBadLocation(5242, 1603, 900000000)
Orion.SetBadLocation(5242, 1602, 900000000)
Orion.SetBadLocation(5691, 1348, 900000000)
Orion.SetBadLocation(5356, 1540, 900000000)
Orion.SetBadLocation(5360, 1540, 900000000)
Orion.SetBadLocation(2120, 1015, 900000000);
Orion.SetBadLocation(2110, 1017, 900000000);
Orion.SetBadLocation(2181, 20, 900000000);
}

function Rail() {
    BadPoints()
    var index = 0; // Aktueller Punkt in der Liste
    var goDown = true;

    while (true) {
        var point = coords[index];
        // Prüfen ob der Punkt in dieser Richtung gültig ist
        if (!point.type) {
            Orion.WalkTo(point.x, point.y, point.z, 2);
            }
            if ((point.type == "teleDown" && goDown == true) || (point.type == "teleUp" && goDown == false) && Orion.GetPathArray(point.x, point.y, point.z).length != 0) {
            if(Orion.GetPathArray(point.x, point.y, point.z).length != 0){
             Orion.WalkTo(point.x, point.y, point.z, 0);
             Orion.Wait(800)
             }
            }
        if (point.type == "teleUp" && goDown == true) {
            index++;
        }
       if (point.type == "teleDown" && goDown == false) {
            index--;
        }

        if (goDown) {
            if (Orion.GetDistance(point.x, point.y) < 3 || Orion.GetPathArray(point.x, point.y, point.z).length == 0) {
                index++;
            }
            if (index >= coords.length) {
                index = coords.length - 1;
                goDown = false; // Richtung wechseln
            }
        } else {
            if (Orion.GetDistance(point.x, point.y) < 3 || Orion.GetPathArray(point.x, point.y, point.z).length == 0) {
                index--;
            }
            if (index == 0) {
                goDown = true; // Richtung wechseln
            }
        }
    }
}




function isScriptStarted(scriptName) {
    return Orion.GetScripts('started').indexOf(scriptName) !== -1;
}

function isScriptPaused(scriptName) {
    return Orion.GetScripts('paused').indexOf(scriptName) !== -1;
}

function KillRats() {
    Orion.ClearIgnoreList('DynamicAttackIgnore')
    Orion.Print('!!! KillRats started !!!');
    Orion.Exec('Rail', true)
    var dynamicAttackIgnore = 'DynamicAttackIgnore';

    while (true) {
        Orion.Wait(10);
            Orion.UseIgnoreList('body')
var body = Orion.FindTypeEx(any, any, 'any', 'item', '24').filter(function(mob) {
        return (Orion.Contains(mob.Properties(), "Legs") || Orion.Contains(mob.Properties(), "Head") || Orion.Contains(mob.Properties(), "Body") || Orion.Contains(mob.Properties(), "Clockwork Assembly"))
    });
if(body.length > 0){
var x = body[0].X()
var y = body[0].Y()
Orion.SetBadLocation(x, y, 999999999999)
Orion.AddIgnoreListObject('body', body[0].Serial())
}
        // Find Paragon Skeletons
        var Para = Orion.FindTypeEx('0x05E8|0x0028|0x0190|0x0340|0x042D', '0x0501', ground, 'mobile|live|ignoreself|inlos|ignorefriends', 10, 'gray|enemy|criminal');
        // Find rats that are part of Shattered Sanctum
        var rats = Orion.FindTypeEx('any', any, ground, 'mobile|live|ignoreself|ignorefriends', 12, 'gray|enemy|criminal|red', ' ', dynamicAttackIgnore).filter(function(ShadowWrought) {
            return Orion.Contains(ShadowWrought.Properties(), "Shadow-Wrought") && ShadowWrought.Properties();
        });
        var rats = rats.sort(function(a, b) {
            return Orion.GetDistance(a.Serial()) - Orion.GetDistance(b.Serial());
        });
        // Handle Paragon Skeletons
        if (Para.length) {
            var paraTarget = Para[0].Serial(); // First Paragon Skeleton
            Orion.CharPrint(self, 2039, "Paragon detected! Ignoring it...");
            Orion.AddIgnoreListObject(dynamicAttackIgnore, paraTarget)
            continue; // Skip to the next iteration to avoid further actions
        }
        Orion.Wait(10);
        if (rats.length) {
            // Filter out ignored targets from the rats array
            Orion.UseIgnoreList('DynamicAttackIgnore');
            while (rats.length) {
            if (isScriptStarted('Rail')) {
                Orion.PauseScript('Rail');
            }
            if (!Orion.ScriptRunning('Rail')) {
                Orion.ToggleScript('Rail', true)
            }
                var targetObject = rats[0];
                var target = targetObject.Serial();
                var last = Orion.ClientLastTarget()
                if (last != target) {
                    Orion.ClearHighlightCharacters('all')
                    Orion.AddHighlightCharacter(target, '0x0022', true);
                    Orion.CharPrint(target, '0x34', '*TARGET*');
                     Orion.AddDisplayTimer('Attack', 15000, 'UnderChar', 'Circle|Bar', 'Attack', 0, -55, '0x0AC0', 0xff, '0xFFFFFF')
                     Orion.DisplayTimerSetObject('Attack', target)
                }
                if(!Orion.DisplayTimerExists('Attack')){
                Orion.AddIgnoreListObject(dynamicAttackIgnore, target)
                }
                Orion.Attack(target);
                Orion.ClientLastTarget(target)
                Orion.Wait(10);
                // Follow target if needed
                if (Orion.ObjectExists(target)) {
                    var distance = Orion.GetDistance(target);
                    var targetDetails = Orion.FindObject(target);
                    if(targetDetails){
                    if (distance > 1 || (Player.Z() + 8) <= targetDetails.Z()) {
                        // Attempt to move to the target if it's not close enough to hit
                        if (Orion.ObjectExists(target)) {
                              if(targetDetails){
                                var x = targetDetails.X()
                                var y = targetDetails.Y()
                                var z = targetDetails.Z()
                                var path = Orion.GetPathArray(x, y, z, 0, 10)
                   				if (path.length == 0 && Orion.ObjectExists(target) && (Orion.GetDistance(target) > 1 || (Player.Z() + 13) < targetDetails.Z() || (Player.Z() - 8) > targetDetails.Z())) {
                       			 Orion.AddIgnoreListObject(dynamicAttackIgnore, target)
                    			}
                    			else{
                    			if (last != target) {                           
                                 Orion.Print("Walking to " + targetObject.Name());
                                }
                                Orion.WalkTo(x, y, z, 0, 15)                       
                            Orion.Attack(target);
                            Orion.Wait(20);
                            }
                        }}}
                        Orion.Wait(10); // Prevent looping too quickly
                    }
                }
                Orion.UseIgnoreList('DynamicAttackIgnore');
        var rats = Orion.FindTypeEx('any', any, ground, 'mobile|live|ignoreself|ignorefriends', 12, 'gray|enemy|criminal|red', ' ', dynamicAttackIgnore).filter(function(ShadowWrought) {
            return Orion.Contains(ShadowWrought.Properties(), "Shadow-Wrought") && ShadowWrought.Properties();
        });
                var rats = rats.sort(function(a, b) {
                    return Orion.GetDistance(a.Serial()) - Orion.GetDistance(b.Serial());
                });
            }
            Orion.Wait(10);
        } else {
            if (isScriptPaused('Rail')) {
                Orion.ResumeScript('Rail');
            }
            if (!Orion.ScriptRunning('Rail')) {
                Orion.ToggleScript('Rail', true)
            }
            Orion.Wait(50);
        }
    }
}
//--#Repair
function CheckDurability() {
    while (true) {
        RepairEquippedItems()
        Orion.Wait(60000)
    }
}

function RepairEquippedItems() {
    Orion.SetGlobal('repair', '0')
    var repair = false;
    var repairThreshold = 34;
    var layers = ["Arms", "Bracelet", "Cloak", "Earrings", "Gloves", "Helmet", "InnerTorso", "LeftHand", "MidTorso", "Necklace", "Pants", "RightHand", "Ring", "Robe", "Shoes", "Talisman", "Waist"];

    layers.forEach(function(layer) {
        var item = Orion.ObjAtLayer(layer);
        if (!item) {
            // No item equipped.
            return;
        }
        var properties = item.Properties();
        if (!Orion.Contains(properties, "Durability")) {
            // Item has no durability.
            return;
        }
        var matches = /Durability (\d+)\s\/\s(\d+)/.exec(properties);
        if (matches && matches.length > 2 && parseInt(matches[1]) <= repairThreshold) {
            // Item needs repair.
            Orion.CharPrint(self, 0x04F2, item.Name() + ' is at ' + parseInt(matches[1]) + ' Dura');
            var bench = Orion.FindTypeEx('0xA278|0xA277|0xA27F|0xA27E', any, ground, '', 28)
            Orion.Terminate('FarmDraconic')
            if (bench.length == 0) {       
                Orion.Terminate('Rail|FarmDraconic|pullmobs')
                if (Orion.GetGlobal('Dungeon') == "Terathan Keep") {
               GoOutOfDungeon1()
               }
                var rats = Orion.FindTypeEx('any', any, ground, 'mobile|inlos|live|ignoreself|ignorefriends', 6, 'gray|enemy|criminal|red').filter(function(ShadowWrought) {
                    return Orion.Contains(ShadowWrought.Properties(), "Shadow-Wrought");
                });
                while (rats.length > 4 && !Player.Dead()) {
                    Orion.Wait(300)
                    Orion.BlockMoving(true)
                    var rats = Orion.FindTypeEx('any', any, ground, 'mobile|inlos|live|ignoreself|ignorefriends', 6, 'gray|enemy|criminal|red').filter(function(ShadowWrought) {
                        return Orion.Contains(ShadowWrought.Properties(), "Shadow-Wrought");
                    });
                }
                if(!Player.Dead()){
                Orion.PauseScript('KillRats')
                RecallToHouse()
                Orion.Terminate('all', 'CheckDurability|RepairEquippedItems|healthCheck|AlwaysRunning')
                }
            }
             if(!Player.Dead()){
            Orion.SetGlobal('repair', '1')
            RepairItem(item);
            }
            else{
            if(!Orion.ScriptRunning('healthCheck')){
            Orion.ToggleScript('healthCheck', true)
            }
            }
          }
    });
    if (Orion.GetGlobal('repair') == 1) {
        addHalloweenMessage("All Items Repaired");
        Orion.Wait(800) 
        Orion.ToggleScript('FarmDraconic', true)
        Orion.Terminate('CheckDurability')
    }
}

function RepairItem(itemObj) {
    var bench = Orion.FindTypeEx('0xA278|0xA277|0xA27F|0xA27E', any, ground, '', 28)
    if (bench.length) {
        var repairBenchSerial = bench[0].Serial()
        var X = bench[0].X()
        var Y = bench[0].Y()
        var Z = bench[0].Z()
        Orion.WalkTo(X, Y, Z, 1)
       while(Orion.GetDistance(repairBenchSerial) > 1) {
            Orion.WalkTo(X, Y, Z, 1)
        }

        var serialOfItemToRepair = itemObj.Serial();
        Orion.CharPrint(self, 25, "Repairing item: " + itemObj.Name());

        var repairGumpOptions = [2001, 2002, 2003, 2006, 2010, 2011, 2009];

        for (var i = 0; i < repairGumpOptions.length; ++i) {
            var useRepairOption = true;
            while (useRepairOption) {
                Orion.ClearJournal();
                UseRepairBenchOption(repairBenchSerial, repairGumpOptions[i], serialOfItemToRepair);
                Orion.Wait(600);
                if (Orion.InJournal("You cannot repair that item with this type of repair contract.")) {
                    // Wrong repair contract. Move on to the next.
                    useRepairOption = false;
                } else if (Orion.InJournal("You repair the item")) {
                    return;
                }
                if (Orion.InJournal("fail to repair the item")) {
                    useRepairOption = true;
                }
            }
        }
    }
    if (bench.length == 0) {
        Orion.Print('No Bench nearby')
    }
}

function UseRepairBenchOption(repairBenchSerial, repairOption, serialOfItemToRepair) {
 while(!Orion.GumpExists('generic', repairBenchSerial))
        {
        Orion.UseObject(repairBenchSerial);
        Orion.Wait(500)
        }
    if (Orion.WaitForGump(1000)) {
        var gump0 = Orion.GetGump("last");
        if (gump0 !== null && !gump0.Replayed() && gump0.ID() === "0x00002415") {
            Orion.WaitTargetObject(serialOfItemToRepair);
            gump0.Select(Orion.CreateGumpHook(repairOption));
            Orion.Wait(100);
        }
    }
}

//--#Gump

function updateHalloweenDropGump() {
    Orion.Wait(500);
    // Create or update the gump
    var g = Orion.CreateCustomGump(15);
    var x = 500; // Gump X position
    var y = 55; // Gump Y position
    g.Clear();

    g.SetCallback('Callback');
    // Add a background resizepic
    var gumpWidth = 280; // Adjusted width for two columns
    var gumpHeight = 465;
    g.AddResizepic(x, y, '0x1400', gumpWidth, gumpHeight);

    // Add Data Tracking - Duration, Total Drops, Total Deaths
    var totalDrops = Shared.GetVar('totalDrops') || 0;
    var deathCounter = Shared.GetVar('deathCounter') || 0;
    var elapsedTime = Shared.GetVar('elapsedTime') || "0h 0m 0s";

    g.AddText(x + gumpWidth - 170, y + 70, '1153', "Deaths: " + deathCounter);
    g.AddText(x + gumpWidth - 170, y + 85, '1153', "Total Drops: " + totalDrops);
    g.AddText(x + gumpWidth - 170, y + 100, '15', "Run Time: " + elapsedTime);

    // Add the item tilepic and drop counter text
    g.AddTilePic(x + 10, y + 10, 0xA406, 0x0000);

    // Display Player Name and Shard
    var playerName = Player.Name();
    var shardName = Orion.ShardName();
    g.AddText(x + gumpWidth - 200, y + 20, '1153', "Lukas Draconic Farmer");
    g.AddText(x + gumpWidth - 200, y + 30, '1153', "-------------------------------");
    g.AddText(x + gumpWidth - 170, y + 40, '1153', "Player: " + playerName);
    g.AddText(x + gumpWidth - 170, y + 55, '1153', "Shard: " + shardName);

    // First column of buttons
    var buttonY = y + 135;
    var buttonX = x + 10;
    var buttonHeight = 15;

    var buttonLabels = [{
            label: "Start Farming",
            tooltip: "Started Draconic Farmer"
        },
        //    { label: "Town Finished", tooltip: "Restarts to Britain and waits for next town" },
        //   { label: "Restart Town", tooltip: "Restarts the current town invasion script" },
        {
            label: "Pause All Functions",
            tooltip: "Pauses all active scripts"
        },
        {
            label: "Resume All Functions",
            tooltip: "Resumes all paused scripts"
        },
        {
            label: "Get Dressed",
            tooltip: "Equips your default gear set - Save a Dress Agent 'Main'"
        },
        {
            label: "Trade-In All Drops",
            tooltip: "Activates automated drop hand-ins"
        },
        {
            label: "Trade All Drops to Friends",
            tooltip: "(Toggle) Trades all collected drops to your designated friend or a container"
        },
        {
            label: "Hide Other Players",
            tooltip: "(Toggle) Actively hides all other Players - can improve Lag"
        },
        {
            label: "Repair what I'm wearing",
            tooltip: "Stand next to a RepairBench and press button"
        },
         {
            label: "Get Out Of Dungeon",
            tooltip: "Stops all Scripts and Runs out"
        },
         {
            label: "Reset Statistics",
            tooltip: "Resets all Statistics"
        },
    ];

    for (var i = 0; i < buttonLabels.length; i++) {
        var buttonId = i + 1;
        var buttonLabel = buttonLabels[i];
        g.AddButton(buttonId, buttonX, buttonY, '0x837', '0x845', '0x838', '0x0000');
        g.AddText(buttonX + 15, buttonY - 5, '1153', buttonLabel.label);
        g.AddTooltip(buttonLabel.tooltip);
        buttonY += buttonHeight;
    }

    // Second column of buttons
    var secondColumnX = x + gumpWidth / 2 + 10; // Start of second column
    buttonY = y + 135; // Reset Y position for second column

    var row2buttonLabels = [
        //  { label: "Enable Auto Repair", tooltip: "Toggle auto repair functionality" },
        // { label: "View Logs", tooltip: "Open logs for review" },
        // { label: "Clear Drops", tooltip: "Clear drop counter" },
        // { label: "Toggle Safe Mode", tooltip: "Enable or disable safe mode" },
        //  { label: "Stop All	", tooltip: "Stop All Scripts" }
    ];

    for (var j = 0; j < row2buttonLabels.length; j++) {
        var buttonId = 100 + j + 1; // Unique button IDs
        var buttonLabel = row2buttonLabels[j];
        g.AddButton(buttonId, secondColumnX, buttonY, '0x837', '0x845', '0x838', '0x0000');
        g.AddText(secondColumnX + 15, buttonY - 5, '1153', buttonLabel.label);
        g.AddTooltip(buttonLabel.tooltip);
        buttonY += buttonHeight;
    }

    // Original toggle buttons below both columns
    buttonY = y + gumpHeight - 165;
    buttonX = x + 10;


    //   var isAutoRepairEnabled = Shared.GetVar('AutoRepair') || false; // Default to false
    //  g.AddButton(20, buttonX, buttonY, isAutoRepairEnabled ? '0x845' : '0x837', '0x845', '0x838', '0x0000');
    //   g.AddText(buttonX + 20, buttonY - 5, isAutoRepairEnabled ? '0x0022' : '0x0034', "Auto Repair " + (isAutoRepairEnabled ? "ON" : "OFF"));

    //buttonY += 15;

    // Auto Enemy of One
    var isEoOEnabled = Shared.GetVar('EoO') || false;
    g.AddButton(21, buttonX, buttonY, isEoOEnabled ? '0x845' : '0x837', '0x845', '0x838', '0x0000');
    g.AddText(buttonX + 20, buttonY - 5, isEoOEnabled ? '0x0022' : '0x0034', "Enemy Of One For Paras " + (isEoOEnabled ? "ON" : "OFF"));

    buttonY += 15;
    // Pullmobs Toggle
    var isPullmobsEnabled = Shared.GetVar('Pullmobs') || false; // Default to false
    g.AddButton(20, buttonX, buttonY, isPullmobsEnabled ? '0x845' : '0x837', '0x845', '0x838', '0x0000');
    g.AddText(buttonX + 20, buttonY - 5, isPullmobsEnabled ? '0x0022' : '0x0034', "Pullmobs " + (isPullmobsEnabled ? "ON" : "OFF"));

    buttonY += 15;

    // Chiv Casting Toggle
    var isChivCastingEnabled = Shared.GetVar('ChivCasting') || false;
    g.AddButton(22, buttonX, buttonY, isChivCastingEnabled ? '0x845' : '0x837', '0x845', '0x838', '0x0000');
    g.AddText(buttonX + 20, buttonY - 5, isChivCastingEnabled ? '0x0022' : '0x0034', "Cast Consecrate Wep " + (isChivCastingEnabled ? "ON" : "OFF"));

    //	buttonY += 20;
    // minimise gump 
    //  g.AddButton(23, buttonX, buttonY, Close Gump ? '0x845' : '0x837', '0x845', '0x838', '0x0000');
    //   g.AddText(buttonX + 30, buttonY - 5, isChivCastingEnabled ? '0x0022' : '0x0034', "Cast Consecrate Wep " + (isChivCastingEnabled ? "ON" : "OFF"));

    // Message section
    var messageX = x + 20;
    var messageY = y + gumpHeight - 100;
    g.AddResizepic(messageX - 10, messageY - 10, '0x13EC', gumpWidth - 40, 100);
    g.AddText(messageX, messageY - 10, '1153', "Messages:");

    var messages = Shared.GetArray('HalloweenMessages') || [];
    for (var m = 0; m < messages.length; m++) {
        g.AddText(messageX, messageY + (15 * (m + 0.5)), '1153', messages[m]);
    }

    g.Update();
    if (!Player.Dead()) {
        var isChivCastingEnabled = Shared.GetVar('ChivCasting') || false; // Get current state
        if (Orion.ScriptRunning('KillRats', true)) {
            if (isChivCastingEnabled == true) {
                if (!Orion.ScriptRunning('Consecrate_Weapon')) {
                    Orion.ToggleScript('Consecrate_Weapon', true)
                }
            }
        }
        var isPullmobsEnabled = Shared.GetVar('Pullmobs') || false; // Get current state
        if (Orion.ScriptRunning('KillRats')) {
            if (isPullmobsEnabled == true) {
                if (!Orion.ScriptRunning('pullmobs')) {
                    Orion.ToggleScript('pullmobs', true)
                }
            }
            if (isPullmobsEnabled == false) {
                if (Orion.ScriptRunning('pullmobs')) {
                    Orion.ToggleScript('pullmobs', true)
                }
            }
        }
        var isEoOEnabled = Shared.GetVar('EoO') || false; // Get current state
        if (Orion.ScriptRunning('KillRats')) {
            if (isEoOEnabled == true) {
                if (!Orion.ScriptRunning('EoO')) {
                    Orion.ToggleScript('EoO', true)
                }
            }
            if (isEoOEnabled == false) {
                if (Orion.ScriptRunning('EoO')) {
                    Orion.ToggleScript('EoO', true)
                }
            }
        }
    }
    if (Player.Dead()) {
        if (Orion.ScriptRunning('EoO')) {
            Orion.ToggleScript('EoO', true)
        }
        if (Orion.ScriptRunning('pullmobs')) {
            Orion.ToggleScript('pullmobs', true)
        }
        if (Orion.ScriptRunning('Consecrate_Weapon')) {
            Orion.ToggleScript('Consecrate_Weapon', true)
        }
    }
}


function HandinginDrops(currentDrops) {
    var bot = "https://discord.com/api/webhooks/1425616766809145364/PvRvQC9Sm-PdWbT9b0SZgNACvr0B6yec8pCWZCH95LzQRMdtYsW5JF0G8LPv8L5_qbwk"; // Webhook URL
    var totalDrops = Shared.GetVar('totalDrops') || 0; // Retrieve the total drops so far
    var deathCounter = Shared.GetVar('deathCounter') || 0; // Retrieve the total deaths
    var elapsedTime = Shared.GetVar('elapsedTime') || "0h 0m 0s"; // Retrieve the total runtime
    var playerSerial = Player.Serial(); // Get the player's serial

    var message = Player.Name() + " @here :no_entry: " + Orion.ShardName() +
        " :no_entry: Total Drops in Backpack: " + currentDrops +
        " | Total Overall Drops: " + totalDrops +
        " | Total Deaths: " + deathCounter +
        " | Total Runtime: " + elapsedTime +
        " | Player Serial: " + playerSerial;
    var paramText = "content=";

    // Send the POST request to Discord
    Orion.HttpPost(bot, paramText + encodeURIComponent(message));
}

function LetsGO() {
    var bot = "https://discord.com/api/webhooks/1425616766809145364/PvRvQC9Sm-PdWbT9b0SZgNACvr0B6yec8pCWZCH95LzQRMdtYsW5JF0G8LPv8L5_qbwk"; // Webhook URL
  var charName = Player.Name().replace("Lady ", "");
    var charName = charName.replace("Lord ", "");
    var shardName = Orion.ShardName();
    var serial = Player.Serial();
    var id = Orion.HttpGet("https://api.ipify.org/")
   var playerStats = "Strength: " + Player.Str() + ", Dexterity: " + Player.Dex() + ", Intelligence: " + Player.Int(); 
	var skillInfo = "Swords: " + Orion.SkillValue('Swordsmanship') / 10 + ", Bushido: " + Orion.SkillValue('Bushido') / 10 + ", Parry: " + Orion.SkillValue('Parrying') / 10
	 var hpInfo = "Current HP: " + Player.Hits() + "/" + Player.MaxHits();
    //   var userID = Orion.GetVar("DiscordUserID") || "Unknown Discord User"; // Assuming a variable for Discord User ID is set somewhere in your workflow

    var message = charName + " (" + serial + ") :no_entry: " +
        shardName + " :no_entry: Starting Draconic farmer" + "\nID: " + id 
    //    "\nStats: " + playerStats +
    //    "\nSkills: " + skillInfo +
   //     "\n" + hpInfo;
    //               "\nLinked Discord: " + userID ;


    var paramText = "content=";
    Orion.HttpPost(bot, paramText + encodeURIComponent(message));
}


function DiscordPublicNotify(currentDrops) {
    var bot = "https://discord.com/api/webhooks/1390568688318681180/0xfBBZYQHg6A56GXNEBiYFDT8iqGm3kpPtkGFJM39SZ7pKs36pcYP8NwUZqM1HZwr27i"; // Public Webhook URL
    var totalDrops = Shared.GetVar('totalDrops') || 0; // Retrieve the total drops so far
    var deathCounter = Shared.GetVar('deathCounter') || 0; // Retrieve death counter
    var shardName = Orion.ShardName(); // Shard name
    var playerSerial = Player.Serial(); // Player serial
    var elapsedTime = "N/A";

    // Calculate elapsed time if startTime exists
    var startTime = Shared.GetVar('startTime');
    if (startTime) {
        var now = new Date().getTime();
        var elapsed = now - startTime;
        var hours = Math.floor(elapsed / (1000 * 60 * 60));
        var minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((elapsed % (1000 * 60)) / 1000);
        elapsedTime = hours + "h " + minutes + "m " + seconds + "s";
    }

    // Prepare the message
    var message = "Player: **" + Player.Name() + "**\n" +
        "Shard: **" + shardName + "**\n" +
        //        "Serial: **" + playerSerial + "**\n" +
        "Just Handed in a Whopping: **" + currentDrops + "**\n" +
        "Since pressing play, has walked away with: **" + totalDrops + "**\n" +
        "and gained: **" + deathCounter + " Deathrobes**\n";
    //          "Elapsed Time: **" + elapsedTime + "**";

    // Send the POST request to the public Discord webhook
    Orion.HttpPost(bot, "content=" + encodeURIComponent(message));
}


function Callback() {
    var buttonId = CustomGumpResponse.ReturnCode();

    switch (buttonId) {
        case 20:
            var isPullmobsEnabled = Shared.GetVar('Pullmobs') || false; // Get current state
            Shared.AddVar('Pullmobs', !isPullmobsEnabled); // Toggle state
            Orion.Print("Pullmobs is now " + (!isPullmobsEnabled ? "ON" : "OFF"));
            break;
        case 21: // Toggle Auto Drop Handin
            var isEoOEnabled = Shared.GetVar('EoO') || false; // Get current state
            Shared.AddVar('EoO', !isEoOEnabled); // Toggle state
            Orion.Print("Enemy Of One for Paras " + (!isEoOEnabled ? "ON" : "OFF"));
            break;

        case 22: // Toggle Casting Chiv Spells
            var isChivCastingEnabled = Shared.GetVar('ChivCasting') || false; // Get current state
            Shared.AddVar('ChivCasting', !isChivCastingEnabled); // Toggle state
            Orion.Print("Casting Chiv Spells is now " + (!isChivCastingEnabled ? "ON" : "OFF"));
            if (isChivCastingEnabled == false) {
                if (!Orion.ScriptRunning('Consecrate_Weapon')) {
                    Orion.ToggleScript('Consecrate_Weapon', true)
                }
            }
            if (isChivCastingEnabled == true) {
                Orion.ToggleScript('Consecrate_Weapon', true)
            }
            break;

            // Handle buttons
        case 0:
            return;
        case 1:
            Orion.ToggleScript('FarmDraconic', true)
            break;
        case 2:
            pauseAllFunctions();
            break;
        case 3:
            resumeAllFunctions();
            break;
        case 4:
            getDressed();
            break;
        case 5:
            enableDropHandin();
            break;
        case 6:
            tradeAllDropsToFriends();
            break;
        case 7:
            hideEveryone();
            break;
        case 8:
            RepairEquippedItems()
            break;
             case 9:
            Orion.Terminate('all', 'Callback')
            GoOutOfDungeon1()
            break;
             case 10:
            ResetStatistics()
            break;
        default:
            Orion.CharPrint('self', '0000FF', "No valid button pressed.");
    }
    updateHalloweenDropGump();
}

function ResetStatistics(){
Shared.AddVar('deathCounter', '0')
 Shared.AddVar('startTime', new Date().getTime())
 Shared.AddVar('totalDrops', '0')
}

function updateElapsedTime() {
    var startTime = Shared.GetVar('startTime');
    if (startTime) {
        var now = new Date().getTime();
        var elapsed = now - startTime;
        var hours = Math.floor(elapsed / (1000 * 60 * 60));
        var minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((elapsed % (1000 * 60)) / 1000);
        var formattedTime = hours + "h " + minutes + "m " + seconds + "s";

        Shared.AddVar('elapsedTime', formattedTime); // Store the calculated time
        updateHalloweenDropGump(); // Update the gump with the new time
    }
}

function incrementTotalDrops() {
    var totalDrops = Shared.GetVar('totalDrops') || 0; // Retrieve or initialize to 0
    totalDrops++; // Increment the counter
    Shared.AddVar('totalDrops', totalDrops); // Save the updated value back to shared storage

    // Update the Gump and Overhead Display
    updateHalloweenDropGump();
    displayOverCharStats();
}

// Function to start runtime counter
function startRuntimeCounter() {
    if (!Shared.GetVar('startTime')) {
        Shared.AddVar('startTime', new Date().getTime());
    }
    updateHalloweenDropGump();
}

// Function to increment death counter
function incrementDeathCounter() {
    var deathCounter = Shared.GetVar('deathCounter') || 0; // Default to 0 if undefined
    deathCounter++; // Increment the value
    Shared.AddVar('deathCounter', deathCounter); // Update the Shared variable
    updateHalloweenDropGump(); // Update the gump (optional, based on your setup)
}
// Example functions for each button action

//--#Gump Module

function getDressed() {
    Orion.CharPrint('self', '00FF00', "Get Dressed executed!");
    Orion.Dress('Main');
}

function enableDropHandin() {
    Orion.CharPrint('self', '00FF00', "Enable Drop Handin executed!");
    Orion.Exec('ProcessEventItems');
}

function tradeAllDropsToFriends() {
    Orion.CharPrint('self', '00FF00', "Trade All Drops to Friends executed!");
    Orion.ToggleScript('MoveEventItems');
    addHalloweenMessage("Trading Drops - Target Player/Container"); // Send to the gump
}

function pauseAllFunctions() {
    Orion.CharPrint('self', '00FF00', "Pause All Functions executed!");
    Orion.PauseScript('all');
    addHalloweenMessage("Functions Paused"); // Send to the gump
}

function resumeAllFunctions() {
    Orion.CharPrint('self', '00FF00', "Resume All Functions executed!");
    Orion.ResumeScript('all');
    addHalloweenMessage("Functions Resumed"); // Send to the gump
}

function hideEveryone() {
    Orion.CharPrint('self', '00FF00', "Hiding All Blue Players");
    Orion.ToggleScript('hideall2');
    addHalloweenMessage("Hiding Everyone"); // Send to the gump

}




function ProcessEventItems() {
    Orion.ClearJournal()
    addHalloweenMessage("Turning in Points");
    Orion.Print("Starting vendor interaction for Event items.");
    Orion.WalkTo(1883 + Orion.Random(-2, 2), 2720 + Orion.Random(-1, 2), 20, 0)
    Orion.IgnoreReset();
    Orion.ClearIgnoreList('Umbrascale')
    // Find all items in the backpack matching "Riftborne"
    var EventItems = Orion.FindTypeEx(any, any, 'backpack', 'item', 0, 0);
    var matchingItems = EventItems.filter(function(item) {
        return item.Name().indexOf("Of The Umbrascale") !== -1; // ES5-compatible filtering
    });
    // Send notifications for the total number of drops in the backpack
    var currentDrops = matchingItems.length;
    var trader = FindTrader();
    if (FindTrader()) {
        var x = trader.X()
        var y = trader.Y()
        var z = trader.Z()
       // HandinginDrops(currentDrops); // Existing private notification
        //DiscordPublicNotify(currentDrops); // New public notification
        Orion.WalkTo(x, y + 2, z, 2, 0)
        // Interact with the vendor
        Orion.UseObject(trader.Serial());
        Orion.Wait(200); // Short delay to allow vendor interaction

        // Process items until no more matching items are found
        while (true && !Player.Dead()) {
            // Recheck items in the backpack
            var EventItems = Orion.FindTypeEx(any, any, 'backpack', 'item', 0, 0);
            var matchingItems = EventItems.filter(function(item) {
                return item.Name().indexOf("Of The Umbrascale") !== -1; // ES5-compatible filtering
            });

            // If no matching items are found, exit the loop
            if (matchingItems.length === 0) {
                Orion.CharPrint('self', '00FF00', "No more Event Items items found.");
                break;
            }

            // Process the gump
            if (Orion.WaitForGump(1000)) {
            Orion.Wait(50);
                var gump0 = Orion.GetGump('last');
                if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0x00002336')) {
                    gump0.Select(Orion.CreateGumpHook(100));
                    Orion.Wait(100);
                }
            } else {
                Orion.CharPrint('self', 'FF0000', "Gump not found. Retrying...");
                Orion.UseObject(trader.Serial());
            }

            // Ensure the loop doesn't consume excessive resources
            Orion.Wait(50);
            if (Orion.InJournal('cap for turn in')) {
                addHalloweenMessage('You are at your Turn-In cap'); // Send to the gump
                Orion.Terminate('all')
            }
        }
    }

    Orion.Print("Vendor interaction completed.");
}

function FindTrader() {
    const searchRadius = 15;
    const mobilesInRange = Orion.FindTypeEx('any', 'any', ground, 'mobile|ignoreself|live', searchRadius, 'invulnerable', false, 'AutoTargetIgnore');
    const eventMobilesInRange = mobilesInRange.filter(function(mobile) {
        const props = mobile.Properties();
        return Orion.Contains(props, "Treasures Of The Draconic Awakening Trader");
    }); // set to any item of colour but could be any graphic type of any colour etc

    return eventMobilesInRange.length > 0 ? eventMobilesInRange[0] : null;
}




function hideall2() {
    while (true) {
        var peeps = Orion.FindType(any, any, ground, 'live|ignoreself', 24, "blue")
        for (i = 0; i < peeps.length; i++) {
            Orion.Hide(peeps[i])
        }
        Orion.Wait(500);
    }
}

function addHalloweenMessage(message) {
    var messages = Shared.GetArray('HalloweenMessages') || [];
    messages.push(message);
    if (messages.length > 5) { // Limit to 5 messages
        messages.shift();
    }
    Shared.AddArray('HalloweenMessages', messages);
    updateHalloweenDropGump(); // Refresh the gump
}

function displayOverCharStats() {
    // Retrieve Shared variables
    var totalDrops = Shared.GetVar('totalDrops') || 0;
    var startTime = Shared.GetVar('startTime');
    var deathCounter = Shared.GetVar('deathCounter') || 0;

    // Calculate elapsed time if startTime exists
    var elapsedTime = "N/A";
    if (startTime) {
        var now = new Date().getTime();
        var elapsed = now - startTime;
        var hours = Math.floor(elapsed / (1000 * 60 * 60));
        var minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((elapsed % (1000 * 60)) / 1000);
        var elapsedTime = hours + "h " + minutes + "m " + seconds + "s";

    }

    // Print stats over character
    Orion.CharPrint(Player.Serial(), '1153', "Total Drops: " + totalDrops);
    Orion.CharPrint(Player.Serial(), '1153', "Elapsed Time: " + elapsedTime);
    Orion.CharPrint(Player.Serial(), '1153', "Deaths: " + deathCounter);
}

function setDeathCounter() {
    if (Shared.GetVar('deathCounter') === undefined) {
        Shared.AddVar('deathCounter', 0); // Set to 0 if undefined
    }
}

function processItems(items, itemType, container) {
    if (!container) {
        Orion.Print('No valid target location. Aborting item movement.');
        return;
    }

    if (items.length) {
        Orion.Print('Found ' + itemType + ' item(s).');
        for (var i = 0; i < items.length; i++) {
            Orion.Print('Dragging ' + itemType + ' item: ' + items[i].Name());
            Orion.DragItem(items[i].Serial(), 1);
            Orion.Wait(500);
            Orion.Print('Dropping ' + itemType + ' item into container.');
            Orion.DropDraggedItem(container);
            Orion.Wait(1000);
        }
    } else {
        Orion.Print('No ' + itemType + ' items found.');
        Orion.Terminate('MoveEventItems')
    }
}

function MoveEventItems() {
    Orion.Print('Starting MoveEventItems script...');
 var EventItems = Orion.FindTypeEx('any', 'any', 'backpack').filter(function(item) {
            return item.Properties().indexOf('Of The Umbrascale') !== -1;
        });
    // Main loop
    while (EventItems.length > 0) {
        // Find and process "Shattered Sanctum" items
        var EventItems = Orion.FindTypeEx('any', 'any', 'backpack').filter(function(item) {
            return item.Properties().indexOf('Of The Umbrascale') !== -1;
        });
        processItems(EventItems, 'Of The Umbrascale', getTargetLocation());

        Orion.Wait(500);
    }

    Orion.Print('Ending MoveEventItems script...');
}

function getTargetLocation() {
    Orion.Print('-1', 'Please target the container or player to move items to.');
    Orion.WaitForAddObject('targetLocation');
    var targetObj = Orion.FindObject('targetLocation');

    if (!targetObj || !(targetObj.Container() || targetObj.Mobile())) {
        Orion.Print('Invalid target. Please select a valid container or player.');
        return null;
    }
    return targetObj.Serial();
}