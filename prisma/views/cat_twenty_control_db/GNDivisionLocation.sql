SELECT `gn`.`id`               AS `gnId`,
       `gn`.`description`      AS `gnName`,
       `o`.`cd_o_id`           AS `subOfficeId`,
       `o`.`cd_o_name_english` AS `subOfficeName`,
       `s`.`cd_s_id`           AS `officeId`,
       `s`.`cd_s_name_english` AS `officeName`,
       `d`.`cd_d_id`           AS `districtId`,
       `d`.`cd_d_name_english` AS `districtName`,
       `p`.`cd_p_id`           AS `provinceId`,
       `p`.`cd_p_name_english` AS `provinceName`
FROM ((((`cat_twenty_control_db`.`cd_gn_divisions` `gn`
    LEFT JOIN `cat_twenty_control_db`.`cd_office` `o` ON ((`o`.`cd_o_id` = `gn`.`office_id`))
    )
    LEFT JOIN `cat_twenty_control_db`.`cd_sabha` `s` ON ((`s`.`cd_s_id` = `o`.`cd_o_cd_s_id`))
    )
    LEFT JOIN `cat_twenty_control_db`.`cd_district` `d` ON ((`d`.`cd_d_id` = `s`.`cd_s_cd_d_id`))
    )
    LEFT JOIN `cat_twenty_control_db`.`cd_province` `p` ON ((`p`.`cd_p_id` = `d`.`cd_d_cd_p_id`)))
