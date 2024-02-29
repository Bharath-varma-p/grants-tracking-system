const moment = require("moment");
module.exports.trafficCrashAdvancedSearch = function (req) {
  const or_conditions = [];
  const and_conditions = [];

  const unit_or_conditions = [];
  const unit_and_conditions = [];

  const person_or_conditions = [];
  const person_and_conditions = [];

  const joins = [];

  const parameters = [];

  const or_parameters = [],
    and_parameters = [],
    unit_or_parameters = [],
    unit_and_parameters = [],
    person_or_parameters = [],
    person_and_parameters = [];

  const search_fields = req.query.search_fields.split("|");
  const search_values = req.query.search_values.split("|");
  const search_categories = req.query.search_categories.split("|");

  const result = {
    where: "",
    join: "",
  };

  if (req.query.apply_search === "1") {
    for (let i = 0; i < search_fields.length; i++) {
      const search_field = search_fields[i];
      const search_value = search_values[i];
      const search_category = search_categories[i];

      if (search_category !== "crash") {
        continue;
      }

      if (search_value) {
        if (search_field === "crash_date_start") {
          const tarih = moment(new Date(search_value)).format("YYYY-MM-DD");

          if (tarih.length === 10) {
            and_conditions.push("crash_date >= ? ");
            and_parameters.push(tarih);
          }
        } else if (search_field === "crash_date_end") {
          const tarih = moment(new Date(search_value)).format("YYYY-MM-DD");

          if (tarih.length === 10) {
            and_conditions.push("crash_date <= ? ");
            and_parameters.push(tarih);
          }
        } else if (search_field === "supplement_report") {
          and_conditions.push("supplement_report = ? ");
          and_parameters.push(search_value);
        } else if (search_field === "report_items") {
          and_conditions.push("CONCAT(',', report_items,',') Like ? ");
          and_parameters.push("%," + search_value + ",%");
        } else if (search_field === "crash_severity") {
          and_conditions.push("crash_severity = ? ");
          and_parameters.push(search_value);
        } else if (search_field === "number_of_units_min") {
          and_conditions.push("CAST(number_of_units AS UNSIGNED) >= ? ");
          and_parameters.push(search_value);
        } else if (search_field === "number_of_units_max") {
          and_conditions.push("CAST(number_of_units AS UNSIGNED) <= ? ");
          and_parameters.push(search_value);
        } else if (search_field === "report_taken_by") {
          and_conditions.push("report_taken_by = ? ");
          and_parameters.push(search_value);
        } else if (search_field === "crash_location") {
          and_conditions.push("Address2 LIKE ? ");
          and_parameters.push("%" + search_value + "%");
        } else if (search_field === "location_road_name") {
          and_conditions.push("location_road_name LIKE ? ");
          and_parameters.push("%" + search_value + "%");
        } else if (search_field === "location_road_type") {
          and_conditions.push("location_road_type = ? ");
          and_parameters.push(search_value);
        } else if (search_field === "roadway_divided") {
          and_conditions.push("roadway_divided = ? ");
          and_parameters.push(search_value);
        } else if (search_field === "first_harmful_event_loc") {
          and_conditions.push("location_first_harmful = ? ");
          and_parameters.push(search_value);
        } else if (search_field === "manner_of_crash") {
          and_conditions.push("crash_manner = ? ");
          and_parameters.push(search_value);
        } else if (search_field === "contour") {
          and_conditions.push("contour = ? ");
          and_parameters.push(search_value);
        } else if (search_field === "road_conditions") {
          and_conditions.push("conditions = ? ");
          and_parameters.push(search_value);
        } else if (search_field === "surface") {
          and_conditions.push("surface = ? ");
          and_parameters.push(search_value);
        } else if (search_field === "light_conditions") {
          and_conditions.push("light_conditions = ? ");
          and_parameters.push(search_value);
        } else if (search_field === "weather") {
          and_conditions.push("weather_conditions = ? ");
          and_parameters.push(search_value);
        } else if (search_field === "officer") {
          and_conditions.push("officer_name LIKE ? ");
          and_parameters.push("%" + search_value + "%");
        } else if (search_field === "narrative") {
          const narrative_conditions = [];

          const narrativeSearch = "%" + search_value + "%";

          narrative_conditions.push("crash_notes LIKE ? ");

          narrative_conditions.push(
            "EXISTS ( SELECT 1 FROM traffic_narrative T1 WHERE T1.incident_no = traffic.crash_no AND T1.deleted IS NULL AND T1.narrative LIKE ? ) "
          );

          or_conditions.push(narrative_conditions);
          or_parameters.push(narrativeSearch, narrativeSearch);
        } else if (search_field === "local_information") {
          and_conditions.push("local_information LIKE ? ");
          and_parameters.push("%" + search_value + "%");
        } else if (search_field === "hit_skip") {
          and_conditions.push("hit_skip = ? ");
          and_parameters.push(search_value);
        } else if (search_field === "dispatch_date_start") {
          const tarih = moment(new Date(search_value)).format("YYYY-MM-DD HH:mm:ss");

          if (tarih.length === 19) {
            and_conditions.push("dispatch_time >= ? ");
            and_parameters.push(tarih);
          }
        } else if (search_field === "dispatch_date_end") {
          const tarih = moment(new Date(search_value)).format("YYYY-MM-DD HH:mm:ss");

          if (tarih.length === 19) {
            and_conditions.push("dispatch_time <= ?");
            and_parameters.push(tarih);
          }
        } else if (search_field === "arrival_date_start") {
          const tarih = moment(new Date(search_value)).format("YYYY-MM-DD HH:mm:ss");

          if (tarih.length === 19) {
            and_conditions.push("arrival_time >= ? ");
            and_parameters.push(tarih);
          }
        } else if (search_field === "arrival_date_end") {
          const tarih = moment(new Date(search_value)).format("YYYY-MM-DD HH:mm:ss");

          if (tarih.length === 19) {
            and_conditions.push("arrival_time <= ? ");
            and_parameters.push(tarih);
          }
        } else if (search_field === "scene_cleared_date_start") {
          const tarih = moment(new Date(search_value)).format("YYYY-MM-DD HH:mm:ss");

          if (tarih.length === 19) {
            and_conditions.push("cleared_time >= ? ");
            and_parameters.push(tarih);
          }
        } else if (search_field === "scene_cleared_date_end") {
          const tarih = moment(new Date(search_value)).format("YYYY-MM-DD HH:mm:ss");

          if (tarih.length === 19) {
            and_conditions.push("cleared_time <= ? ");
            and_parameters.push(tarih);
          }
        } else if (search_field === "total_time_roadway_closed_min") {
          and_conditions.push("CAST( total_time_road_closed AS UNSIGNED ) >= ? ");
          and_parameters.push(search_value);
        } else if (search_field === "total_time_roadway_closed_max") {
          and_conditions.push("CAST( total_time_road_closed AS UNSIGNED ) <= ? ");
          and_parameters.push(search_value);
        } else if (search_field === "other_investigation_time_min") {
          and_conditions.push("CAST( other_investigation_time AS UNSIGNED ) >= ? ");
          and_parameters.push(search_value);
        } else if (search_field === "other_investigation_time_max") {
          and_conditions.push("CAST( other_investigation_time AS UNSIGNED ) ? ");
          and_parameters.push(search_value);
        } else if (search_field === "total_minutes_min") {
          and_conditions.push("CAST( total_minutes AS UNSIGNED ) >= ? ");
          and_parameters.push(search_value);
        } else if (search_field === "total_minutes_max") {
          and_conditions.push("CAST( total_minutes AS UNSIGNED ) <= ? ");
          and_parameters.push(search_value);
        } else if (search_field === "crash_location_neighborhood") {
          and_conditions.push("Neighborhood LIKE ? ");
          and_parameters.push("%" + search_value + "%");
        } else if (search_field === "crash_location_city") {
          and_conditions.push("city LIKE ? ");
          and_parameters.push("%" + search_value + "%");
        } else if (search_field === "crash_location_county") {
          and_conditions.push("County LIKE ? ");
          and_parameters.push("%" + search_value + "%");
        } else if (search_field === "crash_location_state") {
          and_conditions.push("State LIKE ?");
          and_parameters.push("%" + search_value + "%");
        } else if (search_field === "crash_location_zip_code") {
          and_conditions.push("zip_code LIKE ? ");
          and_parameters.push("%" + search_value + "%");
        } else if (search_field === "locality") {
          and_conditions.push("locality = ? ");
          and_parameters.push(search_value);
        } else if (search_field === "location_route_type") {
          and_conditions.push("location_route_type = ?");
          and_parameters.push(search_value);
        } else if (search_field === "location_route_number") {
          and_conditions.push("route_number LIKE ? ");
          and_parameters.push("%" + search_value + "%");
        } else if (search_field === "location_prefix") {
          and_conditions.push("location_prefix = ? ");
          and_parameters.push(search_value);
        } else if (search_field === "reference_route_type") {
          and_conditions.push("reference_route = ? ");
          and_parameters.push(search_value);
        } else if (search_field === "reference_route_number") {
          and_conditions.push("reference_route_number LIKE ? ");
          and_parameters.push("%" + search_value + "%");
        } else if (search_field === "reference_prefix") {
          and_conditions.push("reference_prefix = ? ");
          and_parameters.push(search_value);
        } else if (search_field === "reference_road_name") {
          and_conditions.push("reference_road_name LIKE ? ");
          and_parameters.push("%" + search_value + "%");
        } else if (search_field === "reference_road_type") {
          and_conditions.push("reference_road_type = ? ");
          and_parameters.push(search_value);
        } else if (search_field === "reference_point") {
          and_conditions.push("reference_point = ? ");
          and_parameters.push(search_value);
        } else if (search_field === "direction_from_reference") {
          and_conditions.push("reference_direction = ? ");
          and_parameters.push(search_value);
        } else if (search_field === "distance_from_reference_min") {
          and_conditions.push("CAST( reference_distance AS UNSIGNED ) >= ? ");
          and_parameters.push(search_value);
        } else if (search_field === "distance_from_reference_max") {
          and_conditions.push("CAST( reference_distance AS UNSIGNED ) <= ? ");
          and_parameters.push(search_value);
        } else if (search_field === "distance_unit_of_measure") {
          and_conditions.push("distance_unit_measure = ? ");
          and_parameters.push(search_value);
        } else if (search_field === "intersection_related") {
          and_conditions.push("intersection_related = ? ");
          and_parameters.push(search_value);
        } else if (search_field === "number_of_approaches_min") {
          and_conditions.push("CAST( approach_number AS UNSIGNED ) >= ? ");
          and_parameters.push(search_value);
        } else if (search_field === "number_of_approaches_max") {
          and_conditions.push("CAST( approach_number AS UNSIGNED ) <= ? ");
          and_parameters.push(search_value);
        } else if (search_field === "direction_of_travel") {
          and_conditions.push("travel_direction = ? ");
          and_parameters.push(search_value);
        } else if (search_field === "median_type") {
          and_conditions.push("median_type = ? ");
          and_parameters.push(search_value);
        } else if (search_field === "zone_characteristics") {
          and_conditions.push("zone_characteristics LIKE ? ");
          and_parameters.push("%" + search_value + "%");
        } else if (search_field === "work_zone_type") {
          and_conditions.push("zone_type = ? ");
          and_parameters.push(search_value);
        } else if (search_field === "location_of_crash_in_work_zone") {
          and_conditions.push("zone_location = ? ");
          and_parameters.push(search_value);
        } else if (search_field === "assisting_officer") {
          and_conditions.push("assist_officerList LIKE ? ");
          and_parameters.push("%" + search_value + "%");
        } else if (search_field === "entered_by") {
          and_conditions.push("enteredBy LIKE ? ");
          and_parameters.push("%" + search_value + "%");
        }
      }
    }

    for (let i = 0; i < search_fields.length; i++) {
      const search_field = search_fields[i];
      const search_value = search_values[i];
      const search_category = search_categories[i];

      if (search_category !== "unit") {
        continue;
      }

      if (search_value) {
        if (search_field === "unit_owner_type") {
          unit_and_conditions.push(`owner_type = ? `);
          unit_and_parameters.push(search_value);
        } else if (search_field === "unit_owner_first_name") {
          unit_and_conditions.push(`owner_first_name LIKE ? `);
          unit_and_parameters.push("%" + search_value + "%");
        } else if (search_field === "unit_owner_last_name") {
          unit_and_conditions.push(`owner_last_name LIKE ? `);
          unit_and_parameters.push("%" + search_value + "%");
        } else if (search_field === "unit_type") {
          unit_and_conditions.push(`unit_type = ?`);
          unit_and_parameters.push(search_value);
        } else if (search_field === "unit_license_plate") {
          unit_and_conditions.push(`lp_plate_number LIKE ? `);
          unit_and_parameters.push("%" + search_value + "%");
        } else if (search_field === "vehicle_year_min") {
          unit_and_conditions.push(`CAST(vehicle_year AS UNSIGNED) >= ? `);
          unit_and_parameters.push(search_value);
        } else if (search_field === "vehicle_year_max") {
          unit_and_conditions.push(`CAST(vehicle_year AS UNSIGNED) <= ? `);
          unit_and_parameters.push(search_value);
        } else if (search_field === "vehicle_make") {
          unit_and_conditions.push(`vehicle_make LIKE ? `);
          unit_and_parameters.push("%" + search_value + "%");
        } else if (search_field === "vehicle_model") {
          unit_and_conditions.push(`vehicle_model LIKE ? `);
          unit_and_parameters.push("%" + search_value + "%");
        } else if (search_field === "type_of_use") {
          unit_and_conditions.push(`type_of_use LIKE ? `);
          unit_and_parameters.push("%" + search_value + "%");
        } else if (search_field === "damage_scale") {
          unit_and_conditions.push(`damage_scale = ? `);
          unit_and_parameters.push(search_value);
        } else if (search_field === "unit_owner_middle_name") {
          unit_and_conditions.push(`owner_middle_name LIKE ? `);
          unit_and_parameters.push("%" + search_value + "%");
        } else if (search_field === "unit_owner_suffix") {
          unit_and_conditions.push(`suffix LIKE ? `);
          unit_and_parameters.push("%" + search_value + "%");
        } else if (search_field === "unit_owner_date_of_birth_start") {
          const tarih = moment(new Date(search_value)).format("YYYY-MM-DD");

          if (tarih.length === 10) {
            unit_and_conditions.push("owner_dob >= ? ");
            unit_and_parameters.push(tarih);
          }
        } else if (search_field === "unit_owner_date_of_birth_end") {
          const tarih = moment(new Date(search_value)).format("YYYY-MM-DD");

          if (tarih.length === 10) {
            unit_and_conditions.push("owner_dob <= ? ");
            unit_and_parameters.push(tarih);
          }
        } else if (search_field === "unit_owner_sex") {
          unit_and_conditions.push(`owner_sex = ? `);
          unit_and_parameters.push(search_value);
        } else if (search_field === "unit_owner_race") {
          unit_and_conditions.push(`owner_race = ? `);
          unit_and_parameters.push(search_value);
        } else if (search_field === "unit_owner_address") {
          unit_and_conditions.push(`owner_address LIKE ? `);
          unit_and_parameters.push("%" + search_value + "%");
        } else if (search_field === "unit_owner_apt") {
          unit_and_conditions.push(`apt_no = ? `);
          unit_and_parameters.push(search_value);
        } else if (search_field === "unit_business_name") {
          unit_and_conditions.push(`business_name LIKE ? `);
          unit_and_parameters.push("%" + search_value + "%");
        } else if (search_field === "unit_commercial_carrier") {
          unit_and_conditions.push(`commercial_carrier LIKE ? `);
          unit_and_parameters.push("%" + search_value + "%");
        } else if (search_field === "unit_license_plate_state") {
          unit_and_conditions.push(`lp_state LIKE ? `);
          unit_and_parameters.push("%" + search_value + "%");
        } else if (search_field === "unit_vin") {
          unit_and_conditions.push(`lp_VIN LIKE ? `);
          unit_and_parameters.push("%" + search_value + "%");
        } else if (search_field === "vehicle_color") {
          unit_and_conditions.push(`vehicle_color = ? `);
          unit_and_parameters.push(search_value);
        } else if (search_field === "unit_insurance_verified") {
          unit_and_conditions.push(`insurance_verified = ? `);
          unit_and_parameters.push(search_value);
        } else if (search_field === "unit_insurance_company") {
          unit_and_conditions.push(`insurance_company LIKE ? `);
          unit_and_parameters.push("%" + search_value + "%");
        } else if (search_field === "unit_insurance_policy") {
          unit_and_conditions.push(`insurance_policy_no LIKE ? `);
          unit_and_parameters.push("%" + search_value + "%");
        } else if (search_field === "us_dot") {
          unit_and_conditions.push(`US_DOT_no LIKE ? `);
          unit_and_parameters.push("%" + search_value + "%");
        } else if (search_field === "unit_vehicle_weight") {
          unit_and_conditions.push(`vehicle_weight = ? `);
          unit_and_parameters.push(search_value);
        } else if (search_field === "unit_towed_by") {
          unit_and_conditions.push(`towed_by LIKE ? `);
          unit_and_parameters.push("%" + search_value + "%");
        } else if (search_field === "unit_towed_address") {
          unit_and_conditions.push(`towed_address LIKE ? `);
          unit_and_parameters.push("%" + search_value + "%");
        } else if (search_field === "unit_interlock_device_equipped") {
          unit_and_conditions.push(`interlock_equipped_device = ? `);
          unit_and_parameters.push(search_value);
        } else if (search_field === "is_this_unit_in_error") {
          unit_and_conditions.push(`unit_in_error = ? `);
          unit_and_parameters.push(search_value);
        } else if (search_field === "hit_skip_unit") {
          unit_and_conditions.push(`hit_skip_unit = ? `);
          unit_and_parameters.push(search_value);
        } else if (search_field === "occupants_min") {
          unit_and_conditions.push(`CAST(number_of_occupants AS UNSIGNED) >= ? `);
          unit_and_parameters.push(search_value);
        } else if (search_field === "occupants_max") {
          unit_and_conditions.push(`CAST(number_of_occupants AS UNSIGNED) <= ? `);
          unit_and_parameters.push(search_value);
        } else if (search_field === "hazardous_material") {
          unit_and_conditions.push(`hazadous_material = ? `);
          unit_and_parameters.push(search_value);
        } else if (search_field === "unit_class") {
          unit_and_conditions.push(`class_no LIKE ? `);
          unit_and_parameters.push("%" + search_value + "%");
        } else if (search_field === "unit_placard_id") {
          unit_and_conditions.push(`placard_id LIKE ? `);
          unit_and_parameters.push("%" + search_value + "%");
        } else if (search_field === "number_of_trailing_units_min") {
          unit_and_conditions.push(`CAST(number_of_trailing_units AS UNSIGNED) >= ? `);
          unit_and_parameters.push(search_value);
        } else if (search_field === "number_of_trailing_units_max") {
          unit_and_conditions.push(`CAST(number_of_trailing_units AS UNSIGNED) <= ? `);
          unit_and_parameters.push(search_value);
        } else if (search_field === "unit_operating_in_autonomus_mode") {
          unit_and_conditions.push(`autonomous_mode = ? `);
          unit_and_parameters.push(search_value);
        } else if (search_field === "unit_autonomous_mode_level") {
          unit_and_conditions.push(`autonomous_level = ? `);
          unit_and_parameters.push(search_value);
        } else if (search_field === "unit_special_function_level") {
          unit_and_conditions.push(`special_function_level = ? `);
          unit_and_parameters.push(search_value);
        } else if (search_field === "unit_cargo_body_type") {
          unit_and_conditions.push(`cargo_body_type = ? `);
          unit_and_parameters.push(search_value);
        } else if (search_field === "unit_vehicle_defects") {
          unit_and_conditions.push(`vehicle_defects = ? `);
          unit_and_parameters.push(search_value);
        } else if (search_field === "unit_action") {
          unit_and_conditions.push(`action = ? `);
          unit_and_parameters.push(search_value);
        } else if (search_field === "unit_pre_crash_action") {
          unit_and_conditions.push(`pre_crash_action = ? `);
          unit_and_parameters.push(search_value);
        } else if (search_field === "unit_contributing_circumstances") {
          unit_and_conditions.push(`contributing_factors = ? `);
          unit_and_parameters.push(search_value);
        } else if (search_field === "unit_sequence_of_events") {
          unit_and_conditions.push(
            `? IN (sequence_of_event1,sequence_of_event2,sequence_of_event3,sequence_of_event4,sequence_of_event5,sequence_of_event6)`
          );

          unit_and_parameters.push(search_value);
        } else if (search_field === "unit_first_harmful_event") {
          unit_and_conditions.push(`first_harmful_event = ? `);
          unit_and_parameters.push(search_value);
        } else if (search_field === "unit_most_harmful_event") {
          unit_and_conditions.push(`most_harmful_event = ? `);
          unit_and_parameters.push(search_value);
        } else if (search_field === "unit_trafficway_flow") {
          unit_and_conditions.push(`trafficway_flow = ? `);
          unit_and_parameters.push(search_value);
        } else if (search_field === "unit_number_of_through_lanes_on_road_min") {
          unit_and_conditions.push(`CAST(number_of_lanes AS UNSIGNED) >= ? `);
          unit_and_parameters.push(search_value);
        } else if (search_field === "unit_number_of_through_lanes_on_road_max") {
          unit_and_conditions.push(`CAST(number_of_lanes AS UNSIGNED) <= ? `);
          unit_and_parameters.push(search_value);
        } else if (search_field === "unit_traffic_control") {
          unit_and_conditions.push(`traffic_control = ? `);
          unit_and_parameters.push(search_value);
        } else if (search_field === "unit_rail_grade_crossing") {
          unit_and_conditions.push(`rail_grade_crossing = ? `);
          unit_and_parameters.push(search_value);
        } else if (search_field === "unit_non_motorist_direction_from") {
          unit_and_conditions.push(`unit_non_motorist_direction_from = ? `);
          unit_and_parameters.push(search_value);
        } else if (search_field === "unit_non_motorist_direction_to") {
          unit_and_conditions.push(`unit_non_motorist_direction_to = ? `);
          unit_and_parameters.push(search_value);
        } else if (search_field === "non_motorist_location_at_impact") {
          unit_and_conditions.push(`non_motorist_location = ? `);
          unit_and_parameters.push(search_value);
        } else if (search_field === "unit_speed_min") {
          unit_and_conditions.push(`CAST(unit_speed AS UNSIGNED) >= ? `);
          unit_and_parameters.push(search_value);
        } else if (search_field === "unit_speed_max") {
          unit_and_conditions.push(`CAST(unit_speed AS UNSIGNED) <= ? `);
          unit_and_parameters.push(search_value);
        } else if (search_field === "unit_posted_speed_min") {
          unit_and_conditions.push(`CAST(posted_speed AS UNSIGNED) >= ? `);
          unit_and_parameters.push(search_value);
        } else if (search_field === "unit_posted_speed_max") {
          unit_and_conditions.push(`CAST(posted_speed AS UNSIGNED) <= ? `);
          unit_and_parameters.push(search_value);
        } else if (search_field === "unit_detected_speed") {
          unit_and_conditions.push(`detected_speed = ? `);
          unit_and_parameters.push(search_value);
        } else if (search_field === "unit_damaged_area") {
          unit_and_conditions.push(`CONCAT(',',damage_areas,',') LIKE ? `);
          unit_and_parameters.push(`%,${search_value},%`);
        } else if (search_field === "unit_initial_point_of_contact") {
          unit_and_conditions.push(`initial_contact = ? `);
          unit_and_parameters.push(search_value);
        }
      }
    }

    for (let i = 0; i < search_fields.length; i++) {
      const search_field = search_fields[i];
      const search_value = search_values[i];
      const search_category = search_categories[i];

      if (search_category !== "person") {
        continue;
      }

      if (search_value) {
        if (search_field === "person_type") {
          person_and_conditions.push(`person_type = ? `);
          person_and_parameters.push(search_value);
        } else if (search_field === "traffic_person_first_name") {
          person_and_conditions.push(`first_name LIKE ? `);
          person_and_parameters.push("%" + search_value + "%");
        } else if (search_field === "traffic_person_last_name") {
          person_and_conditions.push(`last_name LIKE ? `);
          person_and_parameters.push("%" + search_value + "%");
        } else if (search_field === "age_min") {
          and_conditions.push("calculateAge(dob, crash_date) >= ? ");
          and_parameters.push(search_value);
        } else if (search_field === "age_max") {
          and_conditions.push("calculateAge(dob, crash_date) <= ? ");
          and_parameters.push(search_value);
        } else if (search_field === "injuries") {
          person_and_conditions.push(`injuries = ? `);
          person_and_parameters.push(search_value);
        } else if (search_field === "person_middle_name") {
          person_and_conditions.push(`middle_name LIKE ? `);
          person_and_parameters.push("%" + search_value + "%");
        } else if (search_field === "person_suffix") {
          person_and_conditions.push(`suffix LIKE ? `);
          person_and_parameters.push("%" + search_value + "%");
        } else if (search_field === "person_date_of_birth_start") {
          const tarih = moment(new Date(search_value)).format("YYYY-MM-DD");

          if (tarih.length === 10) {
            person_and_conditions.push("dob >= ? ");
            person_and_parameters.push(tarih);
          }
        } else if (search_field === "person_date_of_birth_end") {
          const tarih = moment(new Date(search_value)).format("YYYY-MM-DD");

          if (tarih.length === 10) {
            person_and_conditions.push("dob <= ? ");
            person_and_parameters.push(tarih);
          }
        } else if (search_field === "person_sex") {
          person_and_conditions.push(`sex = ? `);
          person_and_parameters.push(search_value);
        } else if (search_field === "person_race") {
          person_and_conditions.push(`race = ? `);
          person_and_parameters.push(search_value);
        } else if (search_field === "person_address") {
          person_and_conditions.push(`address LIKE ? `);
          person_and_parameters.push("%" + search_value + "%");
        } else if (search_field === "person_apt") {
          person_and_conditions.push(`apt_no = ?`);
          person_and_parameters.push(search_value);
        } else if (search_field === "person_phone") {
          person_and_conditions.push(`phone LIKE ? `);
          person_and_parameters.push("%" + search_value + "%");
        } else if (search_field === "traffic_unit_of_the_person") {
          person_and_conditions.push(`traffic_unit_of_the_person = ? `);
          person_and_parameters.push(search_value);
        } else if (search_field === "operator_license_state") {
          person_and_conditions.push(`driving_license_state = ? `);
          person_and_parameters.push(search_value);
        } else if (search_field === "operator_license_number") {
          person_and_conditions.push(`driving_license_no LIKE ? `);
          person_and_parameters.push("%" + search_value + "%");
        } else if (search_field === "person_offense_charged") {
          person_and_conditions.push(`offense_charged = ? `);
          person_and_parameters.push(search_value);
        } else if (search_field === "person_is_local_code") {
          person_and_conditions.push(`local_code = ? `);
          person_and_parameters.push(search_value);
        } else if (search_field === "person_offense_description") {
          person_and_conditions.push(`offense_description LIKE ? `);
          person_and_parameters.push("%" + search_value + "%");
        } else if (search_field === "person_citation_number") {
          person_and_conditions.push(`citation_no LIKE ? `);
          person_and_parameters.push("%" + search_value + "%");
        } else if (search_field === "person_license_class") {
          person_and_conditions.push(`license_class = ? `);
          person_and_parameters.push(search_value);
        } else if (search_field === "person_endorsement") {
          person_and_conditions.push(`endorsement = ? `);
          person_and_parameters.push(search_value);
        } else if (search_field === "person_restriction") {
          person_and_conditions.push(`restriction = ? `);
          person_and_parameters.push(search_value);
        } else if (search_field === "person_driver_distracted_by") {
          person_and_conditions.push(`distracted_by = ? `);
          person_and_parameters.push(search_value);
        } else if (search_field === "person_condition") {
          person_and_conditions.push(`\`condition\` = ? `);
          person_and_parameters.push(search_value);
        } else if (search_field === "person_injured_taken_by") {
          person_and_conditions.push(`injured_taken_by = ? `);
          person_and_parameters.push(search_value);
        } else if (search_field === "person_ems_agency_name") {
          person_and_conditions.push(`ems_name LIKE ? `);
          person_and_parameters.push("%" + search_value + "%");
        } else if (search_field === "person_medical_facility_name") {
          person_and_conditions.push(`medical_facility_name LIKE ? `);
          person_and_parameters.push("%" + search_value + "%");
        } else if (search_field === "person_safety_equipment_used") {
          person_and_conditions.push(`safety_equipment_used = ? `);
          person_and_parameters.push(search_value);
        } else if (search_field === "person_seating_position") {
          person_and_conditions.push(`seating_position = ? `);
          person_and_parameters.push(search_value);
        } else if (search_field === "person_airbag_usage") {
          person_and_conditions.push(`airbag_usage = ?`);
          person_and_parameters.push(search_value);
        } else if (search_field === "person_ejection") {
          person_and_conditions.push(`ejection = ? `);
          person_and_parameters.push(search_value);
        } else if (search_field === "person_trapped") {
          person_and_conditions.push(`trapped = ? `);
          person_and_parameters.push(search_value);
        } else if (search_field === "person_alcohol_drug_suspected") {
          person_and_conditions.push(`alcohol_drug_suspected = ? `);
          person_and_parameters.push(search_value);
        } else if (search_field === "person_alcohol_test") {
          person_and_conditions.push(`alcohol_test = ? `);
          person_and_parameters.push(search_value);
        } else if (search_field === "person_alcohol_test_type") {
          person_and_conditions.push(`alcholol_test_type = ? `);
          person_and_parameters.push(search_value);
        } else if (search_field === "person_alcohol_test_value_min") {
          person_and_conditions.push(`CAST(alcohol_test_value AS UNSIGNED) >= ? `);
          person_and_parameters.push(search_value);
        } else if (search_field === "person_alcohol_test_value_max") {
          person_and_conditions.push(`CAST(alcohol_test_value AS UNSIGNED) <= ? `);
          person_and_parameters.push(search_value);
        } else if (search_field === "person_drug_test") {
          person_and_conditions.push(`drug_test = ? `);
          person_and_parameters.push(search_value);
        } else if (search_field === "person_drug_test_type") {
          person_and_conditions.push(`drug_test_type = ? `);
          person_and_parameters.push(search_value);
        } else if (search_field === "person_drug_test_value") {
          person_and_conditions.push(`drug_test_value = ? `);
          person_and_parameters.push(search_value);
        }
      }
    }

    if (unit_or_conditions.length > 0 || unit_and_conditions.length > 0) {
      let unitWhere = "";

      if (unit_or_conditions.length > 0) {
        for (const conditions of unit_or_conditions) {
          unitWhere += " AND " + `(${conditions.join(" OR ")})`;
        }
        parameters.push(...unit_or_parameters);
      }

      if (unit_and_conditions.length > 0) {
        unitWhere += " AND " + unit_and_conditions.join(" AND ");
        parameters.push(...unit_and_parameters);
      }

      joins.push(`
        JOIN 
        (
           SELECT CrashNo
           FROM traffic_unit
           WHERE (traffic_unit.deleted is null OR (${req.session.passport.user.show_sealed} AND expungement='Yes')) ${unitWhere}
        ) AS trafficUnitQuery ON trafficUnitQuery.CrashNo = traffic.crash_no 
        `);
    }

    if (person_or_conditions.length > 0 || person_and_conditions.length > 0) {
      let personWhere = "";

      if (person_or_conditions.length > 0) {
        for (const conditions of person_or_conditions) {
          personWhere += " AND " + `(${conditions.join(" OR ")})`;
        }
        parameters.push(...person_or_parameters);
      }

      if (person_and_conditions.length > 0) {
        personWhere += " AND " + person_and_conditions.join(" AND ");
        parameters.push(...person_and_parameters);
      }

      joins.push(`
        JOIN 
        (
           SELECT CrashNo
           FROM traffic_person
           WHERE (traffic_person.deleted is null OR (${req.session.passport.user.show_sealed} AND expungement='Yes')) ${personWhere}
        ) AS trafficPersonQuery ON trafficPersonQuery.CrashNo = traffic.crash_no 
        `);
    }

    if (or_conditions.length > 0 || and_conditions.length > 0) {
      if (or_conditions.length > 0) {
        for (const conditions of or_conditions) {
          result.where += " AND " + `(${conditions.join(" OR ")})`;
        }
        parameters.push(...or_parameters);
      }

      if (and_conditions.length > 0) {
        result.where += " AND " + and_conditions.join(" AND ");
        parameters.push(...and_parameters);
      }
    }

    if (joins.length > 0) {
      result.join += joins.join(" ");
    }
  }

  result.parameters = parameters;

  return result;
};
