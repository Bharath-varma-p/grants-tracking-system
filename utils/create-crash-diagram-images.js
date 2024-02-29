const { createReadStream } = require("fs");
const { ErrorResult, SuccessResult } = require("./result.js");
const { getPools } = require("./database.js");
const { uploadToS3 } = require("./upload-to-s3.js");

const crashDiagramImages = [
  "file-1615461723846_car.png",
  "file-1615462106765_truck.png",
  "file-1615462291901_bus.png",
  "file-1615462387011_motorcycle.png",
  "file-1615462546423_bicycle.png",
  "file-1615462601926_person.png",
  "file-1615462648300_deer.png",
  "file-1615462660972_tree.png",
  "file-1615462684206_pole.png",
  "file-1615462711307_mailbox.png",
  "file-1615462733515_utilityPole.png",
  "file-1615462750733_highwaySign.png",
  "file-1615462779631_train.png",
  "file-1615462795713_ambulance.png",
  "file-1615462818844_boulder.png",
  "file-1615462837214_box_truck.png",
  "file-1615462857526_dump_truck.png",
  "file-1615464133515_fence.png",
  "file-1615464327994_fire_hydrant.png",
  "file-1615464508584_firetruck.png",
  "file-1615465135202_overheadSign.png",
  "file-1615465186751_guardrail.png",
  "file-1615465204304_paving_machine.png",
  "file-1615465224895_pickup_truck.png",
  "file-1615465236094_van.png",
  "file-1615465247968_buggy.png",
  "file-1615465275372_animal_drawn_hover.png",
  "file-1615465325134_Roundabout.png",
  "file-1615494376507_4-Way Intersection.png",
  "file-1615494672794_4-Way Offset.png",
  "file-1615495508896_4-Way w Turn Lanes.png",
  "file-1615496988791_5-Lane 4-Way Intersection.png",
  "file-1615498072065_5-Way Intersection.png",
  "file-1616162424990_IR-275 EB.png",
  "file-1624387556176_kemper crash.png",
];

async function uploadCrashDiagramImage(department, fileName) {
  const fileStream = createReadStream("initial-diagram-images/" + fileName);

  const uploadResult = await uploadToS3({
    body: fileStream,
    file: `${department.path}/uploads/${fileName}`,
  });

  fileStream.destroy();
  return uploadResult;
}

module.exports.createCrashDiagramImages = async function (department) {
  const { pool } = getPools("sna");

  let db;
  try {
    db = await pool.getConnection();

    globalThis.logger.info("Creating crash diagram images for " + department.name);

    await db.query(`USE ${department.database_name}`);

    await db.query(`
      INSERT INTO traffic_image_attachments 
      (id,
        incident_no,
        path,
        file_name,
        orginal_name,
        file_size,
        user,
        edited_date,
        thumbnail,
        form_name,
        category,
        size,
        label)
      VALUES 
      (1,'trafficImage','${globalThis.bucketFullURL}/${department.path}/uploads/file-1615461723846_car.png','file-1615461723846_car.png','car.png','3624','Ozer, Murat','2021-03-11 06:22:04',NULL,NULL,'Units','100','Passenger Car'),
      (2,'trafficImage','${globalThis.bucketFullURL}/${department.path}/uploads/file-1615462106765_truck.png','file-1615462106765_truck.png','truck.png','76136','Ozer, Murat','2021-03-11 06:28:27',NULL,NULL,'Units','100','Truck'),
      (3,'trafficImage','${globalThis.bucketFullURL}/${department.path}/uploads/file-1615462291901_bus.png','file-1615462291901_bus.png','bus.png','66003','Ozer, Murat','2021-03-11 06:31:32',NULL,NULL,'Units','100','Bus'),
      (4,'trafficImage','${globalThis.bucketFullURL}/${department.path}/uploads/file-1615462387011_motorcycle.png','file-1615462387011_motorcycle.png','motorcycle.png','66793','Ozer, Murat','2021-03-11 06:33:07',NULL,NULL,'Units','100','Motorcycle'),
      (5,'trafficImage','${globalThis.bucketFullURL}/${department.path}/uploads/file-1615462546423_bicycle.png','file-1615462546423_bicycle.png','bicycle.png','9019','Ozer, Murat','2021-03-11 06:35:46',NULL,NULL,'Units','100','Bicycle'),
      (6,'trafficImage','${globalThis.bucketFullURL}/${department.path}/uploads/file-1615462601926_person.png','file-1615462601926_person.png','person.png','12775','Ozer, Murat','2021-03-11 06:36:42',NULL,NULL,'Units','100','Person'),
      (7,'trafficImage','${globalThis.bucketFullURL}/${department.path}/uploads/file-1615462648300_deer.png','file-1615462648300_deer.png','deer.png','17327','Ozer, Murat','2021-03-11 06:37:28',NULL,NULL,'Units','100','Deer'),
      (8,'trafficImage','${globalThis.bucketFullURL}/${department.path}/uploads/file-1615462660972_tree.png','file-1615462660972_tree.png','tree.png','68952','Ozer, Murat','2021-03-11 06:37:41',NULL,NULL,'Units','100','Tree'),
      (9,'trafficImage','${globalThis.bucketFullURL}/${department.path}/uploads/file-1615462684206_pole.png','file-1615462684206_pole.png','pole.png','3372','Ozer, Murat','2021-03-11 06:38:04',NULL,NULL,'Signs','100','Pole'),
      (10,'trafficImage','${globalThis.bucketFullURL}/${department.path}/uploads/file-1615462711307_mailbox.png','file-1615462711307_mailbox.png','mailbox.png','24186','Ozer, Murat','2021-03-11 06:38:31',NULL,NULL,'Signs','100','Mailbox'),
      (11,'trafficImage','${globalThis.bucketFullURL}/${department.path}/uploads/file-1615462733515_utilityPole.png','file-1615462733515_utilityPole.png','utilityPole.png','14999','Ozer, Murat','2021-03-11 06:38:54',NULL,NULL,'Signs','100','Utility Pole'),
      (12,'trafficImage','${globalThis.bucketFullURL}/${department.path}/uploads/file-1615462750733_highwaySign.png','file-1615462750733_highwaySign.png','highwaySign.png','47521','Ozer, Murat','2021-03-11 06:39:11',NULL,NULL,'Signs','100','Highway Sign'),
      (13,'trafficImage','${globalThis.bucketFullURL}/${department.path}/uploads/file-1615462779631_train.png','file-1615462779631_train.png','train.png','6723','Ozer, Murat','2021-03-11 06:39:40',NULL,NULL,'Units','100','Train'),
      (14,'trafficImage','${globalThis.bucketFullURL}/${department.path}/uploads/file-1615462795713_ambulance.png','file-1615462795713_ambulance.png','ambulance.png','6127','Ozer, Murat','2021-03-11 06:39:56',NULL,NULL,'Units','100','Ambulance'),
      (15,'trafficImage','${globalThis.bucketFullURL}/${department.path}/uploads/file-1615462818844_boulder.png','file-1615462818844_boulder.png','boulder.png','3691','Ozer, Murat','2021-03-11 06:40:19',NULL,NULL,'Signs','100','Boulder'),
      (16,'trafficImage','${globalThis.bucketFullURL}/${department.path}/uploads/file-1615462837214_box_truck.png','file-1615462837214_box_truck.png','box_truck.png','6097','Ozer, Murat','2021-03-11 06:40:37',NULL,NULL,'Units','100','Box Truck'),
      (17,'trafficImage','${globalThis.bucketFullURL}/${department.path}/uploads/file-1615462857526_dump_truck.png','file-1615462857526_dump_truck.png','dump_truck.png','6005','Ozer, Murat','2021-03-11 06:40:58',NULL,NULL,'Units','100','Drum Truck'),
      (18,'trafficImage','${globalThis.bucketFullURL}/${department.path}/uploads/file-1615464133515_fence.png','file-1615464133515_fence.png','fence.png','8276','Ozer, Murat','2021-03-11 07:02:14',NULL,NULL,'Signs','100','Fence'),
      (19,'trafficImage','${globalThis.bucketFullURL}/${department.path}/uploads/file-1615464327994_fire_hydrant.png','file-1615464327994_fire_hydrant.png','fire_hydrant.png','3418','Ozer, Murat','2021-03-11 07:05:28',NULL,NULL,'Signs','100','Fire Hydrant'),
      (20,'trafficImage','${globalThis.bucketFullURL}/${department.path}/uploads/file-1615464508584_firetruck.png','file-1615464508584_firetruck.png','firetruck.png','10229','Ozer, Murat','2021-03-11 07:08:29',NULL,NULL,'Units','100','FireTruck'),
      (21,'trafficImage','${globalThis.bucketFullURL}/${department.path}/uploads/file-1615465135202_overheadSign.png','file-1615465135202_overheadSign.png','overheadSign.png','44509','Ozer, Murat','2021-03-11 07:18:55',NULL,NULL,'Signs','100','Overhead Sign'),
      (22,'trafficImage','${globalThis.bucketFullURL}/${department.path}/uploads/file-1615465186751_guardrail.png','file-1615465186751_guardrail.png','guardrail.png','4382','Ozer, Murat','2021-03-11 07:19:47',NULL,NULL,'Signs','100','Guardrail'),
      (23,'trafficImage','${globalThis.bucketFullURL}/${department.path}/uploads/file-1615465204304_paving_machine.png','file-1615465204304_paving_machine.png','paving_machine.png','6472','Ozer, Murat','2021-03-11 07:20:04',NULL,NULL,'Units','100','Paving Machine'),
      (24,'trafficImage','${globalThis.bucketFullURL}/${department.path}/uploads/file-1615465224895_pickup_truck.png','file-1615465224895_pickup_truck.png','pickup_truck.png','10270','Ozer, Murat','2021-03-11 07:20:25',NULL,NULL,'Units','100','Pickup Truck'),
      (25,'trafficImage','${globalThis.bucketFullURL}/${department.path}/uploads/file-1615465236094_van.png','file-1615465236094_van.png','van.png','6013','Ozer, Murat','2021-03-11 07:20:36',NULL,NULL,'Units','100','Van'),
      (26,'trafficImage','${globalThis.bucketFullURL}/${department.path}/uploads/file-1615465247968_buggy.png','file-1615465247968_buggy.png','buggy.png','32172','Ozer, Murat','2021-03-11 07:20:48',NULL,NULL,'Units','100','Buggy'),
      (27,'trafficImage','${globalThis.bucketFullURL}/${department.path}/uploads/file-1615465275372_animal_drawn_hover.png','file-1615465275372_animal_drawn_hover.png','animal_drawn_hover.png','12822','Ozer, Murat','2021-03-11 07:21:15',NULL,NULL,'Units','100','Animal Drawn'),
      (28,'trafficImage','${globalThis.bucketFullURL}/${department.path}/uploads/file-1615465325134_Roundabout.png','file-1615465325134_Roundabout.png','Roundabout.png','6933','Ozer, Murat','2021-03-11 07:22:05',NULL,NULL,'Templates','1500','Roundabout'),
      (29,'trafficImage','${globalThis.bucketFullURL}/${department.path}/uploads/file-1615494376507_4-Way Intersection.png','file-1615494376507_4-Way Intersection.png','4-Way Intersection.png','5324','Ozer, Murat','2021-03-11 15:26:17',NULL,NULL,'Templates','1500','4-Way Intersection'),
      (30,'trafficImage','${globalThis.bucketFullURL}/${department.path}/uploads/file-1615494672794_4-Way Offset.png','file-1615494672794_4-Way Offset.png','4-Way Offset.png','4662','Ozer, Murat','2021-03-11 15:31:13',NULL,NULL,'Templates','1500','4-Way Offset'),
      (31,'trafficImage','${globalThis.bucketFullURL}/${department.path}/uploads/file-1615495508896_4-Way w Turn Lanes.png','file-1615495508896_4-Way w Turn Lanes.png','4-Way w Turn Lanes.png','8481','Ozer, Murat','2021-03-11 15:45:09',NULL,NULL,'Templates','1500','4-Way w Turn Lanes'),
      (32,'trafficImage','${globalThis.bucketFullURL}/${department.path}/uploads/file-1615496988791_5-Lane 4-Way Intersection.png','file-1615496988791_5-Lane 4-Way Intersection.png','5-Lane 4-Way Intersection.png','5699','Ozer, Murat','2021-03-11 16:09:49',NULL,NULL,'Templates','1500','5-Lane 4-Way Intersection'),
      (33,'trafficImage','${globalThis.bucketFullURL}/${department.path}/uploads/file-1615498072065_5-Way Intersection.png','file-1615498072065_5-Way Intersection.png','5-Way Intersection.png','7871','Ozer, Murat','2021-03-11 16:27:52',NULL,NULL,'Templates','1500','5-Way Intersection'),
      (34,'trafficImage','${globalThis.bucketFullURL}/${department.path}/uploads/file-1616162424990_IR-275 EB.png','file-1616162424990_IR-275 EB.png','IR-275 EB.png','5140','Sabransky S, Tim','2021-03-19 10:00:25',NULL,NULL,'Templates','1500','275'),
      (35,'trafficImage','${globalThis.bucketFullURL}/${department.path}/uploads/file-1624387556176_kemper crash.png','file-1624387556176_kemper crash.png','kemper crash.png','117878','Cordes, Walter','2021-06-22 14:45:57',NULL,NULL,'Templates','1500','tes test');
    `);

    const uploadPromises = crashDiagramImages.map((image) => uploadCrashDiagramImage(department, image));

    await Promise.all(uploadPromises);

    globalThis.logger.info("Created crash diagram images for " + department.name);

    return new SuccessResult();
  } catch (err) {
    globalThis.logger.error(err);

    return new ErrorResult(`Creating crash diagram images failed. Department : ${department.name}`, err);
  } finally {
    if (db) {
      db.release();
    }
  }
};
