
const complaint_form_crime_types = [
    {
        orc_no : '2903.01A',
        content : `
        did purposely, and with prior calculation and design, cause the FIELD1 , contrary to and in violation of Section 2903.01 of the
        Revised Code of Ohio, a Felony of the first degree.
        `,
        field_options:[
            ["death of NAME_OF_VICTIM", "unlawful termination of NAME_OF_VICTIM's pregnancy"]
        ]
    },
    {
        orc_no : '2903.01B',
        content : `
        did purposely cause the FIELD1 ,<br/>
        while committing, or attempting to commit, or fleeing immediately after committing or attempting to commit
        the offense of FIELD2 , contrary to and in violation of Section 2903.01 of the
        Revised Code of Ohio, a Felony of the first degree.
        `,
        field_options:[
            ["death of NAME_OF_VICTIM", "unlawful termination of NAME_OF_VICTIM's pregnancy"],
            ["kidnapping", "rape","aggravated arson","arson","aggravated robbery","robbery","aggravated burglary","burglary","escape"],
        ]
    },
    {
        orc_no : '2903.01C',
        content : `
        did purposely cause the death of FIELD1 , a person under thirteen years
        of age at the time of commission of the offense, contrary to and in violation of Section 2903.01 of the
        Revised Code of Ohio, a Felony of the first degree.
        `,
        field_options:[
            ["NAME_OF_VICTIM"]
        ]
    },
    {
        orc_no : '2903.02A',
        content : `
        did FIELD1 <br/>,
        contrary to and in violation of Section 2903.02(A) of the Ohio Revised Code.
        `,
        field_options:[
            ["purposely cause the death of NAME_OF_VICTIM","purposely cause the unlawful termination of NAME_OF_VICTIM's pregnancy"]
        ]
    },
    {
        orc_no : '2903.02B',
        content : `
        did cause the death of FIELD1 as a proximate result of committing or
        attempting to commit FIELD2 contrary to and in violation of Section 2903.02(B) of the Ohio Revised
        Code.
        `,
        field_options:[
            ["NAME_OF_VICTIM"],
            [{type : 'input', placeholder:"State offense" }]
        ]
    },
    {
        orc_no : '2903.04A',
        content : `
        did cause the death of FIELD1
        As a proximate result of the defendant’s FIELD2
        Contrary to and violation of Section
        2903.04 of the Revised Code of Ohio.
        `,
        field_options:[
            ["NAME_OF_VICTIM"],
            ["committing a felony","attempting to commit a felony"]
        ]
    },
    {
        orc_no : '2903.06A2A',
        content : `
        while FIELD1 a FIELD2
        did recklessly FIELD3,
        contrary to and in violation of Section 2903.06 (A) (2) (A) of the Ohio Revised Code, a felony of the FIELD4 degree.
        `,
        field_options:[
            ["operating","participating in the operation of"],
            ["motor vehicle","motorcycle","snowmobile","locomotive","watercraft","aircraft"],
            ["cause the death of NAME_OF_VICTIM","cause the unlawful termination of another’s pregnancy"],
            [
                {
                    type:'select', 
                    options: ["[F2]","[F3]"], 
                    hint: `
                    [F2] if at the time of offense, the offender was driving under a suspension imposed under Chapter 4507 or any other provision of the Revised Code
                    or if the offender previously has been convicted of or pleaded guilty to a violation of this section, any traffic-related homicide, manslaughter,
                    or assault offense.
                    `
                }
            ]

        ]
    },
    {
        orc_no : '2903.06A3A',
        content : `
        while FIELD1 a FIELD2
        did negligently FIELD3,
        contrary to and in violation of Section 2903.06 (A) (3) (A) of the Ohio Revised Code, a misdemeanor/felony of the FIELD4 degree.
        `,
        field_options:[
            ["operating","participating in the operation of"],
            ["motor vehicle","motorcycle","snowmobile","locomotive","watercraft","aircraft"],
            ["cause the death of NAME_OF_VICTIM","cause the unlawful termination of another’s pregnancy"],
            [
                {
                    type:'select', 
                    options: ["[M1]","[F4]"], 
                    hint: `
                        [F4] if at the time of offense, the offender was driving under a suspension or revocation imposed under Chapter 4507 or any other
                        provision of the Revised Code or if the offender previously has been convicted of or pleaded guilty to a violation of this section,
                        any traffic-related homicide, manslaughter, or assault offense.
                    `
                }
            ]

        ]
    },
    {
        orc_no : '2903.08A1A',
        content : `
        while FIELD1 a FIELD2
        did recklessly cause the serious physical harm to FIELD3 as a proximate
        result of committing a violation of R.C. 4511.19, contrary to and in violation of Section 2903.08 (A) (1) (A) of the
        Ohio Revised Code, a felony of the FIELD4 degree.
        `,
        field_options:[
            ["operating","participating in the operation of"],
            ["motor vehicle","motorcycle","snowmobile","locomotive","watercraft","aircraft"],
            ["NAME_OF_VICTIM","another’s unborn"],
            [
                {
                    type:'select', 
                    options: ["[F3]","[F2]"], 
                    hint: `
                        [F2] if at the time of offense, the offender was driving under a suspension imposed under Chapter 4507 or any other provision of the
                        Revised Code or if the offender previously has been convicted of or pleaded guilty to a violation of this section, any traffic-related
                        homicide, manslaughter, or assault offense; three prior convictions of R.C. 4511.19 or of a substantially equilivant municipal ordinance
                        within 6 years; or a second or subsequent felony violation of R.C. 4511.19.
                    `
                }
            ]

        ]
    },
    {
        orc_no : '2903.08A2B',
        content : `
        while FIELD1 a FIELD2
        did recklessly cause the serious physical harm to FIELD3, contrary to and in
        violation of Section 2903.08 (A) (2) (A) of the Ohio Revised Code, a felony of the FIELD4 degree.
        `,
        field_options:[
            ["operating","participating in the operation of"],
            ["motor vehicle","motorcycle","snowmobile","locomotive","watercraft","aircraft"],
            ["NAME_OF_VICTIM","another’s unborn"],
            [
                {
                    type:'select', 
                    options: ["[F4]","[F3]"], 
                    hint: `
                        [F3] if at the time of offense, the offender was driving under a suspension imposed under Chapter 4507 or any other provision of the
                        Revised Code or if the offender previously has been convicted of or pleaded guilty to a violation of this section, any traffic-related
                        homicide, manslaughter, or assault offense
                    `
                }
            ]

        ]
    },
    {
        orc_no : '2903.11A2',
        content : `
        did knowingly FIELD1 physical harm to
        FIELD2 by means of a deadly weapon or dangerous ordnance, to wit FIELD3
        contrary to and in violation of Section 2903.11 of the Revised Code of Ohio, a FIELD4 degree.
        `,
        field_options:[
            ["cause serious","cause or attempt to cause"],
            ["NAME_OF_VICTIM","NAME_OF_VICTIM's unborn"],
            [{ type: "select", data_source: "property", hint : "Describe weapon"}],
            [
                {
                    type:'select', 
                    options: ["[F1]","[F2]"], 
                    hint: `
                        [F2] a felony of the second degree
                        [F1] if the victim of the violation is a peace officer
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2903.12A2',
        content : `
            FIELD1 either of which is brought
            on by serious provocation occasioned by FIELD2, that was reasonably
            sufficient to incite the said FIELD3 into using deadly force, did knowingly
            FIELD4 by means of a deadly weapon or dangerous ordnance as define in section 2923.11 Ohio Revised Code to wit FIELD5
            contrary to and in violation of Section 2903.12 of the Revised Code of Ohio, a felony of the FIELD6 degree.
        `,
        field_options:[
            ["while under the influence of sudden passion","in a sudden fit of rage","under extreme emotional distress"],
            ["NAME_OF_VICTIM"],
            ["NAME_OF_DEFENDANT"],
            ["cause serious physical harm to NAME_OF_VICTIM","NAME_OF_VICTIM's unborn","cause or attempt to cause physical harm to NAME_OF_VICTIM","cause or attempt to cause physical harm to NAME_OF_VICTIM's unborn"],
            [{ type: "select", data_source: "property", hint : "describe the weapon or ordnance"}],
            [
                {
                    type:'select', 
                    options: ["[F4]","[F3]"], 
                    hint: `
                        [F4] Felony of the 4th degree
                        [F3] if the victim is a peace officer
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2903.13A',
        content : `
        did FIELD1 physical harm to
        FIELD2
        contrary to and in violation of Section 2903.13 of the Revised Code of Ohio, a FIELD3 degree.
        `,
        field_options:[
            ["knowingly cause","knowingly attempt to cause"],
            ["NAME_OF_VICTIM","NAME_OF_VICTIM's unborn"],
            [
                {
                    type:'select', 
                    options: ["[M1]","[F5]","[F4]","[F3]"], 
                    hint: `
                        [M1] Misdemeanor of the 1st degree
                        [F5] if the offense occurred in a school, on school premises, in a school building, on a school bus, or while the victim is outside school
                        premises, and is engaged in duties or official responsibilities with the victim's employment as a school teacher, administrator,
                        school bus driver, or chaperoning students at or on a class field trip, athletic events or other school extracurricular activities.
                        [F4] if the victim is a peace officer, a firefighter, or a person performing medical service while in the performance of their official duties
                        if the defendant is a caretaker and the victim is a functionally impaired person under the caretaker's care
                        [F3] if the defendant is a caretaker and the victim is a functionally impaired person under the caretaker's care, and the offender has
                        previously been convicted of a violation of 2903.11, 2903.13 , 2903.16 and if the previous offense was against a functionally
                        impaired person under the care of the offender
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2903.13B',
        content : `
        did FIELD1 physical harm to
        FIELD2
        contrary to and in violation of Section 2903.13 of the Revised Code of Ohio, a FIELD3 degree.
        `,
        field_options:[
            ["recklessly cause serious"],
            ["NAME_OF_VICTIM","NAME_OF_VICTIM's unborn"],
            [
                {
                    type:'select', 
                    options: ["[M1]","[F5]","[F4]","[F3]"], 
                    hint: `
                        [M1] Misdemeanor of the 1st degree
                        [F5] if the offense occurred in a school, on school premises, in a school building, on a school bus, or while the victim is outside school
                        premises, and is engaged in duties or official responsibilities with the victim's employment as a school teacher, administrator,
                        school bus driver, or chaperoning students at or on a class field trip, athletic events or other school extracurricular activities.
                        [F4] if the victim is a peace officer, a firefighter, or a person performing medical service while in the performance of their official duties
                        if the defendant is a caretaker and the victim is a functionally impaired person under the caretaker's care
                        [F3] if the defendant is a caretaker and the victim is a functionally impaired person under the caretaker's care, and the offender has
                        previously been convicted of a violation of 2903.11, 2903.13 , 2903.16 and if the previous offense was against a functionally
                        impaired person under the care of the offender
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2903.14',
        content : `
        did negligently, by means of a deadly weapon or dangerous ordnance as defined in section 2923.11 of the
        Revised Code of Ohio, to-wit FIELD1 , cause physical harm to
        FIELD2 , contrary to and in violation of Section
        2903.14 of the Revised Code of Ohio, a Misdemeanor of the third degree.
        `,
        field_options:[
            [{ type: "select", data_source: "property", hint : "describe weapon/ordnance"}],
            ["NAME_OF_VICTIM"]
        ]
    },
    {
        orc_no : '2903.21',
        content : `
        did knowingly cause FIELD1 to
        believe that the defendant would cause serious physical harm to FIELD2 
        Contrary to and in violation of 2903.21 of the Revised Code of Ohio.
        `,
        field_options:[
            ["NAME_OF_VICTIM"],
            ["The property of NAME_OF_VICTIM"],
            ["a member of NAME_OF_VICTIM immediate family"]
        ]
    },
    {
        orc_no : '2903.211',
        content : `
        did, by engaging in a pattern of conduct, knowingly cause FIELD1
        to believe that FIELD2 would cause FIELD3
        to FIELD4, contrary to and in violation of Section 2903.211 of the
        Revised Code of Ohio, a FIELD5 of the degree.
        `,
        field_options:[
            ["NAME_OF_VICTIM"],
            ["NAME_OF_DEFENDANT"],
            ["physical harm","mental distress"],
            ["NAME_OF_VICTIM"],
            [
                {
                    type:'select', 
                    options: ["[M1]","[F5]","[F4]"], 
                    hint: `
                        [M1] a misdemeanor of the 1st degree
                        [F4] if the offender has previously been convicted of 2903.21 OR 2911.211.1 and in committing the offense the offender made threats of physical harm against the victim, or in committing the offense the offender trespassed on the land where the victim lives, or works, or
                        attends school. Or while committing the offense the offender had a deadly weapon on or about the offenders person or under
                        the offenders control, or the victim of the offense is a minor, or the offender at the time of the offense was the subject of
                        a protection order issued under 2903.213, 2903.214. or in committing the offense the offender caused serious physical harm
                        to the premises at which the victim resides or to any personal property located at that premises
                        [F5] if the victim of the offense is an officer or employee of a public children service agency or a private child placing agency and the offense relates to the officer’s or employee’s performance or anticipated performance of official responsibilities or duties
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2903.22',
        content : `
        did knowingly cause FIELD1 to believe that the said FIELD2
        would cause physical harm to FIELD3
        contrary to and in violation of Section 2903.22 of the Revised Code of Ohio, a misdemeanor of the fourth degree.
        `,
        field_options:[
            ["NAME_OF_VICTIM"],
            ["NAME_OF_DEFENDANT"],
            [
                {
                    type:'select', 
                    options: ["NAME_OF_VICTIM","the property of NAME_OF_VICTIM","NAME_OF_VICTIM's unborn","a member of NAME_OF_VICTIM's immediate family"], 
                    onChange: function(){

                        runChangeEventHandler(
                            {
                                select: $(this),
                                searchValue : "a member of",
                                placeholder : "name of family member",
                                beforeStatement : ", to wit"
                            }    
                        )
                    }
                }
            ]
            
        ]
    },
    {
        orc_no : '2905.02A1',
        content : `
        without privilege to do so, did knowingly FIELD1,
        did remove, FIELD2, from where he/she was found.
        Contrary to and in violation of Section 2905.02A1 of the Revised Code of Ohio, a felony of the third degree.
        `,
        field_options:[
            ["by force","by threat"],
            ["NAME_OF_VICTIM"]
        ]
    },
    {
        orc_no : '2905.03A',
        content : `
        did knowingly and without privilege restrain
        FIELD1 of his/her liberty, contrary to and violation of
        Section 2905.03 of the Revised Code of Ohio.
        `,
        field_options:[
            ["NAME_OF_VICTIM"]
        ]
    },
    {
        orc_no : '2905.05A',
        content : `
        did without privilege, knowingly FIELD1 FIELD2,
        to accompany the person in any manner, including entering into any vehicle as defined in R.C. 4501.01 , and
        said FIELD3 being less than fourteen years of age, whether or not the said
        FIELD4 knew the age of FIELD5,
        without the express or implied permission of the FIELD6 of
        FIELD7 and the said FIELD8
        is not a law enforcement officer, medic, firefighter, or other person who regularly provided emergency services, and is not an employee or agent of, or a volunteer acting under the direction of any board of education, or, if so employed, is not at the time acting within the scope of his/her lawful duties in that capacity. Contrary to and in violation of Section 2905.05 of the Revised Code of Ohio, 
        a FIELD9 degree.
        `,
        field_options:[
            ["solicit","coax","entice","lure"],
            ["NAME_OF_CHILD"],
            ["NAME_OF_VICTIM"],
            ["NAME_OF_DEFENDANT"],
            ["NAME_OF_VICTIM"],
            ["parent","guardian","other legal custodian"],
            ["NAME_OF_VICTIM"],
            ["NAME_OF_DEFENDANT"],
            [
                {
                    type:'select', 
                    options: ["[M1]","[F5]"], 
                    hint: `
                        [M1]
                        [F5] if there is a prior conviction of 2907.02 - 2907.03 - 2907.12
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2905.01A',
        content : `
        did FIELD1 by
        means of FIELD2, and for purpose of
        FIELD3,
        Contrary to and violation of Section 2905.01(A) of the Revised Code of Ohio, a felony of the FIELD4 degree.
        `,
        field_options:[
            ["remove NAME_OF_VICTIM from the place where he/she was found","restrain NAME_OF_VICTIM of his/her liberty"],
            ["force","threat","deception"],
            [
                "holding for ransom",
                "holding as shield",
                "holding as hostage",
                "facilitate the commission of a felony",
                "facilitate fight after commission of a felony",
                "terrorizing on NAME_OF_VICTIM",
                "inflicting serious harm on NAME_OF_VICTIM",
                "engaging in sexual activity",
                "as defined in Section 2907-01 ORC with NAME_OF_VICTIM against his/her will",
                "hinder a function of government",
                "impede a function of government",
                "obstructing a function of government",
                "forcing an action on the part of governmental authority",
                "forcing a concession on the part of governmental authority",
            ],
            [
                {
                    type:'select', 
                    options: ["[1st]","[2nd]"], 
                    hint: `
                        2nd if victim was released in a safe place unharmed or 1st if not
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2905.01A1',
        content : `
        did FIELD1 by
        means of FIELD2, and for purpose of
        FIELD3,
        Contrary to and violation of Section 2905.01(A) of the Revised Code of Ohio, a felony of the FIELD4 degree.
        `,
        field_options:[
            ["remove NAME_OF_VICTIM from the place where he/she was found","restrain NAME_OF_VICTIM of his/her liberty"],
            ["force","threat","deception"],
            [
                "holding for ransom",
                "holding as shield",
                "holding as hostage"
            ],
            [
                {
                    type:'select', 
                    options: ["[1st]","[2nd]"], 
                    hint: `
                        2nd if victim was released in a safe place unharmed or 1st if not
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2905.01A2',
        content : `
        did FIELD1 by
        means of FIELD2, and for purpose of
        FIELD3,
        Contrary to and violation of Section 2905.01(A) of the Revised Code of Ohio, a felony of the FIELD4 degree.
        `,
        field_options:[
            ["remove NAME_OF_VICTIM from the place where he/she was found","restrain NAME_OF_VICTIM of his/her liberty"],
            ["force","threat","deception"],
            [
                "facilitate the commission of a felony",
                "facilitate fight after commission of a felony"
            ],
            [
                {
                    type:'select', 
                    options: ["[1st]","[2nd]"], 
                    hint: `
                        2nd if victim was released in a safe place unharmed or 1st if not
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2905.01A3',
        content : `
        did FIELD1 by
        means of FIELD2, and for purpose of
        FIELD3,
        Contrary to and violation of Section 2905.01(A) of the Revised Code of Ohio, a felony of the FIELD4 degree.
        `,
        field_options:[
            ["remove NAME_OF_VICTIM from the place where he/she was found","restrain NAME_OF_VICTIM of his/her liberty"],
            ["force","threat","deception"],
            [
                "terrorizing on NAME_OF_VICTIM",
                "inflicting serious harm on NAME_OF_VICTIM"

            ],
            [
                {
                    type:'select', 
                    options: ["[1st]","[2nd]"], 
                    hint: `
                        2nd if victim was released in a safe place unharmed or 1st if not
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2905.01A4',
        content : `
        did FIELD1 by
        means of FIELD2, and for purpose of
        FIELD3,
        Contrary to and violation of Section 2905.01(A) of the Revised Code of Ohio, a felony of the FIELD4 degree.
        `,
        field_options:[
            ["remove NAME_OF_VICTIM from the place where he/she was found","restrain NAME_OF_VICTIM of his/her liberty"],
            ["force","threat","deception"],
            [
                "engaging in sexual activity"
            ],
            [
                {
                    type:'select', 
                    options: ["[1st]","[2nd]"], 
                    hint: `
                        2nd if victim was released in a safe place unharmed or 1st if not
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2905.01A5',
        content : `
        did FIELD1 by
        means of FIELD2, and for purpose of
        FIELD3,
        Contrary to and violation of Section 2905.01(A) of the Revised Code of Ohio, a felony of the FIELD4 degree.
        `,
        field_options:[
            ["remove NAME_OF_VICTIM from the place where he/she was found","restrain NAME_OF_VICTIM of his/her liberty"],
            ["force","threat","deception"],
            [
                "hinder a function of government",
                "impede a function of government",
                "obstructing a function of government"
            ],
            [
                {
                    type:'select', 
                    options: ["[1st]","[2nd]"], 
                    hint: `
                        2nd if victim was released in a safe place unharmed or 1st if not
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2905.01B',
        content : `
        did knowingly FIELD1
        said victim being FIELD2 under circumstances
        which created a substantial risk of serious physical harm to said FIELD3 Contrary to and violation of Section
        2905.01(B) of the Revised Code of Ohio, a felony of the FIELD4 degree.
        `,
        field_options:[
            ["remove NAME_OF_VICTIM from the place where he/she was found","restrain NAME_OF_VICTIM of his/her liberty","hold another in a condition of involuntary servitude"],
            ["a person under 13 years of age","mentally incompetent"],
            ["NAME_OF_VICTIM"],
            [
                {
                    type:'select', 
                    options: ["[1st]","[2nd]"], 
                    hint: `
                        2nd if victim was released in a safe place unharmed or 1st if not
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2905.01B1',
        content : `
        did knowingly FIELD1
        said victim being FIELD2 under circumstances
        which created a substantial risk of serious physical harm to said FIELD3 Contrary to and violation of Section
        2905.01(B) of the Revised Code of Ohio, a felony of the FIELD4 degree.
        `,
        field_options:[
            ["remove NAME_OF_VICTIM from the place where he/she was found"],
            ["a person under 13 years of age","mentally incompetent"],
            ["NAME_OF_VICTIM"],
            [
                {
                    type:'select', 
                    options: ["[1st]","[2nd]"], 
                    hint: `
                        2nd if victim was released in a safe place unharmed or 1st if not
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2905.01B2',
        content : `
        did knowingly FIELD1
        said victim being FIELD2 under circumstances
        which created a substantial risk of serious physical harm to said FIELD3 Contrary to and violation of Section
        2905.01(B) of the Revised Code of Ohio, a felony of the FIELD4 degree.
        `,
        field_options:[
            ["restrain NAME_OF_VICTIM of his/her liberty"],
            ["a person under 13 years of age","mentally incompetent"],
            ["NAME_OF_VICTIM"],
            [
                {
                    type:'select', 
                    options: ["[1st]","[2nd]"], 
                    hint: `
                        2nd if victim was released in a safe place unharmed or 1st if not
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2905.01B3',
        content : `
        did knowingly FIELD1
        said victim being FIELD2 under circumstances
        which created a substantial risk of serious physical harm to said FIELD3 Contrary to and violation of Section
        2905.01(B) of the Revised Code of Ohio, a felony of the FIELD4 degree.
        `,
        field_options:[
            ["hold another in a condition of involuntary servitude"],
            ["a person under 13 years of age","mentally incompetent"],
            ["NAME_OF_VICTIM"],
            [
                {
                    type:'select', 
                    options: ["[1st]","[2nd]"], 
                    hint: `
                        2nd if victim was released in a safe place unharmed or 1st if not
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2905.11',
        content : `
        with purpose to FIELD1
        To wit: FIELD2, did
        FIELD3,
        Contrary to and violation of Section 2907.03 of the Revised Code of Ohio.
        `,
        field_options:[
            ["obtain a valuable thing from NAME_OF_VICTIM","obtain a valuable benefit from NAME_OF_VICTIM","induce NAME_OF_VICTIM to commit an unlawful act"],
            [{ type: "select", data_source: "property", hint : "describe the valuable (thing)(benefit) sought or the unlawful act the defendant induced the victim to commit."}],
            [
                "threaten to commit a felony",
                "threaten to commit an offense of violence",
                "violate section (2903-21)(2903-22) O.R.C.",
                "utter a calumny against NAME_OF_VICTIM",
                "threaten to utter a calumny against NAME_OF_VICTIM",
                "expose a matter that tended to subject NAME_OF_VICTIM to hatred",
                "expose a matter that tended to subject NAME_OF_VICTIM to contempt",
                "expose a matter that tended to subject NAME_OF_VICTIM to ridicule",
                "threaten to expose a matter that tended to subject NAME_OF_VICTIM to hatred",
                "threaten to expose a matter that tended to subject NAME_OF_VICTIM to contempt",
                "threaten to expose a matter that tended to subject NAME_OF_VICTIM to ridicule",
                "expose a matter tending to damage NAME_OF_VICTIM personal repute",
                "expose a matter tending to damage NAME_OF_VICTIM business repute",
                "threaten to expose a matter tending to damage NAME_OF_VICTIM personal repute",
                "threaten to expose a matter tending to damage NAME_OF_VICTIM business repute",
                "expose a matter tending to impair NAME_OF_VICTIM credit",
                "threaten to expose a matter tending to impair NAME_OF_VICTIM credit"
            ]
        ]
    },
    {
        orc_no : '2905.11A1',
        content : `
        with purpose to FIELD1
        To wit: FIELD2, did
        FIELD3,
        Contrary to and violation of Section 2907.03 of the Revised Code of Ohio.
        `,
        field_options:[
            ["obtain a valuable thing from NAME_OF_VICTIM","obtain a valuable benefit from NAME_OF_VICTIM","induce NAME_OF_VICTIM to commit an unlawful act"],
            [{ type: "select", data_source: "property", hint : "describe the valuable (thing)(benefit) sought or the unlawful act the defendant induced the victim to commit."}],
            ["threaten to commit a felony"]
        ]
    },
    {
        orc_no : '2905.11A2',
        content : `
        with purpose to FIELD1
        To wit: FIELD2, did
        FIELD3,
        Contrary to and violation of Section 2907.03 of the Revised Code of Ohio.
        `,
        field_options:[
            ["obtain a valuable thing from NAME_OF_VICTIM","obtain a valuable benefit from NAME_OF_VICTIM","induce NAME_OF_VICTIM to commit an unlawful act"],
            [{ type: "select", data_source: "property", hint : "describe the valuable (thing)(benefit) sought or the unlawful act the defendant induced the victim to commit."}],
            ["threaten to commit an offense of violence"]
        ]
    },
    {
        orc_no : '2905.11A3',
        content : `
        with purpose to FIELD1
        To wit: FIELD2, did
        FIELD3,
        Contrary to and violation of Section 2907.03 of the Revised Code of Ohio.
        `,
        field_options:[
            ["obtain a valuable thing from NAME_OF_VICTIM","obtain a valuable benefit from NAME_OF_VICTIM","induce NAME_OF_VICTIM to commit an unlawful act"],
            [{ type: "select", data_source: "property", hint : "describe the valuable (thing)(benefit) sought or the unlawful act the defendant induced the victim to commit."}],
            ["violate section (2903-21)(2903-22) O.R.C."]
        ]
    },
    {
        orc_no : '2905.11A4',
        content : `
        with purpose to FIELD1
        To wit: FIELD2, did
        FIELD3,
        Contrary to and violation of Section 2907.03 of the Revised Code of Ohio.
        `,
        field_options:[
            ["obtain a valuable thing from NAME_OF_VICTIM","obtain a valuable benefit from NAME_OF_VICTIM","induce NAME_OF_VICTIM to commit an unlawful act"],
            [{ type: "select", data_source: "property", hint : "describe the valuable (thing)(benefit) sought or the unlawful act the defendant induced the victim to commit."}],
            ["utter a calumny against NAME_OF_VICTIM","threaten to utter a calumny against NAME_OF_VICTIM"]
        ]
    },
    {
        orc_no : '2905.11A5',
        content : `
        with purpose to FIELD1
        To wit: FIELD2, did
        FIELD3,
        Contrary to and violation of Section 2907.03 of the Revised Code of Ohio.
        `,
        field_options:[
            ["obtain a valuable thing from NAME_OF_VICTIM","obtain a valuable benefit from NAME_OF_VICTIM","induce NAME_OF_VICTIM to commit an unlawful act"],
            [{ type: "select", data_source: "property", hint : "describe the valuable (thing)(benefit) sought or the unlawful act the defendant induced the victim to commit."}],
            [
                "expose a matter that tended to subject NAME_OF_VICTIM to hatred",
                "expose a matter that tended to subject NAME_OF_VICTIM to contempt",
                "expose a matter that tended to subject NAME_OF_VICTIM to ridicule",
                "threaten to expose a matter that tended to subject NAME_OF_VICTIM to hatred",
                "threaten to expose a matter that tended to subject NAME_OF_VICTIM to contempt",
                "threaten to expose a matter that tended to subject NAME_OF_VICTIM to ridicule",
                "expose a matter tending to damage NAME_OF_VICTIM personal repute",
                "expose a matter tending to damage NAME_OF_VICTIM business repute",
                "threaten to expose a matter tending to damage NAME_OF_VICTIM personal repute",
                "threaten to expose a matter tending to damage NAME_OF_VICTIM business repute",
                "expose a matter tending to impair NAME_OF_VICTIM credit",
                "threaten to expose a matter tending to impair NAME_OF_VICTIM credit"
            ]
        ]
    },
    {
        orc_no : '2907.02',
        content : `
            did engage in sexual conduct with FIELD1 not his/her spouse FIELD2
        `,
        field_options:[
            ["NAME_OF_VICTIM"],
            [
                "having purposely compelled him/her to submit by force",
                "having purposely compelled him/her to submit by threat of force",
                "and being a person less than thirteen tears of age",
                "having, for the purpose of preventing resistance, substantially impaired his/her judgement by administering a drug to him/her surreptitiously",
                "having, for the purpose of preventing resistance, substantially impaired his/her judgement by administering a drug to him/her by force",
                "having, for the purpose of preventing resistance, substantially impaired his/her judgement by administering a drug to him/her by threat of force",
                "having, for the purpose of preventing resistance, substantially impaired his/her judgement by administering a drug to him/her by deception",
                "having, for the purpose of preventing resistance, substantially impaired his/her judgement by administering an intoxicant to him/her surreptitiously",
                "having, for the purpose of preventing resistance, substantially impaired his/her judgement by administering an intoxicant to him/her by force",
                "having, for the purpose of preventing resistance, substantially impaired his/her judgement by administering an intoxicant to him/her by threat of force",
                "having, for the purpose of preventing resistance, substantially impaired his/her judgement by administering an intoxicant to him/her by deception",
                "having, for the purpose of preventing resistance, substantially impaired his/her control by administering a drug to him/her surreptitiously",
                "having, for the purpose of preventing resistance, substantially impaired his/her control by administering a drug to him/her by force",
                "having, for the purpose of preventing resistance, substantially impaired his/her control by administering a drug to him/her by threat of force",
                "having, for the purpose of preventing resistance, substantially impaired his/her control by administering a drug to him/her by deception",
                "having, for the purpose of preventing resistance, substantially impaired his/her control by administering an intoxicant to him/her surreptitiously",
                "having, for the purpose of preventing resistance, substantially impaired his/her control by administering an intoxicant to him/her by force",
                "having, for the purpose of preventing resistance, substantially impaired his/her control by administering an intoxicant to him/her by threat of force",
                "having, for the purpose of preventing resistance, substantially impaired his/her control by administering an intoxicant to him/her by deception",
            ]
        ]
    },
    {
        orc_no : '2907.02A1A',
        content : `
        did engage in sexual conduct with FIELD1 not his/her spouse FIELD2
        `,
        field_options:[
            ["NAME_OF_VICTIM"],
            [
                "having, for the purpose of preventing resistance, substantially impaired his/her judgement by administering a drug to him/her surreptitiously",
                "having, for the purpose of preventing resistance, substantially impaired his/her judgement by administering a drug to him/her by force",
                "having, for the purpose of preventing resistance, substantially impaired his/her judgement by administering a drug to him/her by threat of force",
                "having, for the purpose of preventing resistance, substantially impaired his/her judgement by administering a drug to him/her by deception",
                "having, for the purpose of preventing resistance, substantially impaired his/her judgement by administering an intoxicant to him/her surreptitiously",
                "having, for the purpose of preventing resistance, substantially impaired his/her judgement by administering an intoxicant to him/her by force",
                "having, for the purpose of preventing resistance, substantially impaired his/her judgement by administering an intoxicant to him/her by threat of force",
                "having, for the purpose of preventing resistance, substantially impaired his/her judgement by administering an intoxicant to him/her by deception",
                "having, for the purpose of preventing resistance, substantially impaired his/her control by administering a drug to him/her surreptitiously",
                "having, for the purpose of preventing resistance, substantially impaired his/her control by administering a drug to him/her by force",
                "having, for the purpose of preventing resistance, substantially impaired his/her control by administering a drug to him/her by threat of force",
                "having, for the purpose of preventing resistance, substantially impaired his/her control by administering a drug to him/her by deception",
                "having, for the purpose of preventing resistance, substantially impaired his/her control by administering an intoxicant to him/her surreptitiously",
                "having, for the purpose of preventing resistance, substantially impaired his/her control by administering an intoxicant to him/her by force",
                "having, for the purpose of preventing resistance, substantially impaired his/her control by administering an intoxicant to him/her by threat of force",
                "having, for the purpose of preventing resistance, substantially impaired his/her control by administering an intoxicant to him/her by deception",
            ]
        ]
    },
    {
        orc_no : '2907.02A1B',
        content : `
        did engage in sexual conduct with FIELD1 not his/her spouse FIELD2
        `,
        field_options:[
            ["NAME_OF_VICTIM"],
            ["and being a person less than thirteen tears of age"]
        ]
    },
    {
        orc_no : '2907.02A2',
        content : `
        did engage in sexual conduct with FIELD1 not his/her spouse FIELD2
        `,
        field_options:[
            ["NAME_OF_VICTIM"],
            [
                "having purposely compelled him/her to submit by force",
                "having purposely compelled him/her to submit by threat of force"
            ]
        ]
    },
    {
        orc_no : '2907.03',
        content : `
            did engage in sexual conduct with FIELD1 not
            his/her spouse FIELD2 Contrary to and violation of Section
            2907.03 of the Revised Code of Ohio.
        `,
        field_options:[
            ["NAME_OF_VICTIM"],
            [
                "having knowingly coerced him/her to submit by means that would prevent resistance by a person of ordinary resolution",
                "knowing that his/ her ability to appraise the nature of his/her own conduct was substantially impaired",
                "knowing that his/ her ability to control his/her own conduct was substantially impaired",
                "knowing that he/shesubmitted because he/she was unaware that the act was being committed",
                "knowing that he/she submitted mistakenly identified the defendant as his/her spouse",
                "being his/her natural parent",
                "being his/her adoptive parent",
                "being his/her step parent",
                "being his/her guardian",
                "being his/her custodian",
                "being his/her person in loco parent",
                "having supervisory authority over him/her while he/she was in custody of law",
                "having supervisory authority over him/her while he/she was a parent in a hospital",
                "having supervisory authority over him/her while he/she was a patient in a institution",
                "having disciplinary authority over him/her while he/she was in custody of law",
                "having disciplinary authority over him/her while he/she was a parent in a hospital",
                "having disciplinary authority over him/her while he/she was a patient in a institution"
            ]
        ]
    },
    {
        orc_no : '2907.03A1',
        content : `
            did engage in sexual conduct with FIELD1 not
            his/her spouse FIELD2 Contrary to and violation of Section
            2907.03 of the Revised Code of Ohio.
        `,
        field_options:[
            ["NAME_OF_VICTIM"],
            [
                "having knowingly coerced him/her to submit by means that would prevent resistance by a person of ordinary resolution"
            ]
        ]
    },
    {
        orc_no : '2907.03A2',
        content : `
            did engage in sexual conduct with FIELD1 not
            his/her spouse FIELD2 Contrary to and violation of Section
            2907.03 of the Revised Code of Ohio.
        `,
        field_options:[
            ["NAME_OF_VICTIM"],
            [
                "knowing that his/ her ability to appraise the nature of his/her own conduct was substantially impaired",
                "knowing that his/ her ability to control his/her own conduct was substantially impaired"
            ]
        ]
    },
    {
        orc_no : '2907.03A3',
        content : `
            did engage in sexual conduct with FIELD1 not
            his/her spouse FIELD2 Contrary to and violation of Section
            2907.03 of the Revised Code of Ohio.
        `,
        field_options:[
            ["NAME_OF_VICTIM"],
            [
                "knowing that he/shesubmitted because he/she was unaware that the act was being committed"
            ]
        ]
    },
    {
        orc_no : '2907.03A4',
        content : `
            did engage in sexual conduct with FIELD1 not
            his/her spouse FIELD2 Contrary to and violation of Section
            2907.03 of the Revised Code of Ohio.
        `,
        field_options:[
            ["NAME_OF_VICTIM"],
            [
                "knowing that he/she submitted mistakenly identified the defendant as his/her spouse"
            ]
        ]
    },
    {
        orc_no : '2907.03A5',
        content : `
            did engage in sexual conduct with FIELD1 not
            his/her spouse FIELD2 Contrary to and violation of Section
            2907.03 of the Revised Code of Ohio.
        `,
        field_options:[
            ["NAME_OF_VICTIM"],
            [
                "being his/her natural parent",
                "being his/her adoptive parent",
                "being his/her step parent",
                "being his/her guardian",
                "being his/her custodian",
                "being his/her person in loco parent"
            ]
        ]
    },
    {
        orc_no : '2907.03A6',
        content : `
            did engage in sexual conduct with FIELD1 not
            his/her spouse FIELD2 Contrary to and violation of Section
            2907.03 of the Revised Code of Ohio.
        `,
        field_options:[
            ["NAME_OF_VICTIM"],
            [
                "having supervisory authority over him/her while he/she was in custody of law",
                "having supervisory authority over him/her while he/she was a parent in a hospital",
                "having supervisory authority over him/her while he/she was a patient in a institution",
                "having disciplinary authority over him/her while he/she was in custody of law",
                "having disciplinary authority over him/her while he/she was a parent in a hospital",
                "having disciplinary authority over him/her while he/she was a patient in a institution"
            ]
        ]
    },
    {
        orc_no : '2907.04',
        content : `
        being eighteen years of age or older, did engage in sexual conduct with FIELD1 ,
        not the spouse of said FIELD2 , the said FIELD3
        knowing that FIELD4 , was thirteen years of age or older, but less than sixteen
        years of age, FIELD5 , contrary to and in
        violation of Section 2907.04 of the Revised Code of Ohio, a FIELD6 degree.
        `,
        field_options:[
            ["NAME_OF_VICTIM"],
            ["NAME_OF_DEFENDANT"],
            ["NAME_OF_DEFENDANT"],
            ["NAME_OF_VICTIM"],
            [
                "to-wit AGE_OF_VICTIM years of age",
                "being reckless in that regard"
            ],
            [
                {
                    type:'select', 
                    options: ["[M1]","[F4]","[F3]","[F2]"], 
                    hint: `
                        [F4] a Felony of the 4th degree,
                        [M1] if the offender is less than four years older than the victim,
                        [F3] if the offender is ten or more years older than the victim,
                        [F2] if the offender has previously been convicted of or pleaded guilty to a violation of 2907.02, 2907.03, 2907.04, or former 2907.12
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2907.05',
        content : `
        did FIELD1
        FIELD2,
        a felony of the FIELD3 degree, contrary to and in violation of Section 2907.05 of the Ohio Revised Code.
        `,
        field_options:[
            [
                "have sexual contact with NAME_OF_VICTIM, not the spouse of the offender",
                "cause NAME_OF_VICTIM, not the spouse of the offender,to have sexual contact with the offender",
                "cause two or more persons to have sexual contact",
            ],
            [
                "by purposely compelling the other, or one of the others, to submit by force or threat of force",
                "for the purpose of preventing resistance, the offender substantially impairs the judgment or control of the other person or of one of the other persons by administering any drug or intoxicant or controlled substance to the other person, surreptitiously or by force, threat of force, or deception",
                "the offender knows that the judgment or control of the other person, or one of the other persons is substantially impaired as a result of the influence of any drug or intoxicant administered to the other person with the other persons consent for the purpose of any kind of medical or dental examination,treatment, or surgery",
                "the other person, or one of the other persons, is less than thirteen years of age whether or not the offender knows the age of that person",
                "the ability of the other person to resist or consent or the ability of one of the other persons to resist or consent is substantially impaired because of a mental or physical condition or because of advanced age, and the offender knows or has reasonable cause to believe that the ability to resist or consent of the other person or one of the other persons is substantially impaired because of a mental or physical condition or because of advanced age"
            ],
            [
                {
                    type:'select', 
                    options: ["[F4]","[F3]"], 
                    hint: `
                        [F4]
                        [F3] if the offender under division 2(b) substantially impairs the judgement or control of the other person or one of the other persons by administering
                        any controlled substance described in 3719.41 to the person surreptitiously or by force, threat of force, or deception.
                        [F3] where other person is less than 13, regardless of whether offender knows the age.
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2907.05A1',
        content : `
        did FIELD1
        FIELD2,
        a felony of the FIELD3 degree, contrary to and in violation of Section 2907.05 of the Ohio Revised Code.
        `,
        field_options:[
            [
                "have sexual contact with NAME_OF_VICTIM, not the spouse of the offender",
                "cause NAME_OF_VICTIM, not the spouse of the offender,to have sexual contact with the offender",
                "cause two or more persons to have sexual contact",
            ],
            [
                "by purposely compelling the other, or one of the others, to submit by force or threat of force"
            ],
            [
                {
                    type:'select', 
                    options: ["[F4]","[F3]"], 
                    hint: `
                        [F4]
                        [F3] if the offender under division 2(b) substantially impairs the judgement or control of the other person or one of the other persons by administering
                        any controlled substance described in 3719.41 to the person surreptitiously or by force, threat of force, or deception.
                        [F3] where other person is less than 13, regardless of whether offender knows the age.
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2907.05A2',
        content : `
        did FIELD1
        FIELD2,
        a felony of the FIELD3 degree, contrary to and in violation of Section 2907.05 of the Ohio Revised Code.
        `,
        field_options:[
            [
                "have sexual contact with NAME_OF_VICTIM, not the spouse of the offender",
                "cause NAME_OF_VICTIM, not the spouse of the offender,to have sexual contact with the offender",
                "cause two or more persons to have sexual contact",
            ],
            [
                "for the purpose of preventing resistance, the offender substantially impairs the judgment or control of the other person or of one of the other persons by administering any drug or intoxicant or controlled substance to the other person, surreptitiously or by force, threat of force, or deception"
            ],
            [
                {
                    type:'select', 
                    options: ["[F4]","[F3]"], 
                    hint: `
                        [F4]
                        [F3] if the offender under division 2(b) substantially impairs the judgement or control of the other person or one of the other persons by administering
                        any controlled substance described in 3719.41 to the person surreptitiously or by force, threat of force, or deception.
                        [F3] where other person is less than 13, regardless of whether offender knows the age.
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2907.05A3',
        content : `
        did FIELD1
        FIELD2,
        a felony of the FIELD3 degree, contrary to and in violation of Section 2907.05 of the Ohio Revised Code.
        `,
        field_options:[
            [
                "have sexual contact with NAME_OF_VICTIM, not the spouse of the offender",
                "cause NAME_OF_VICTIM, not the spouse of the offender,to have sexual contact with the offender",
                "cause two or more persons to have sexual contact",
            ],
            [
                "the offender knows that the judgment or control of the other person, or one of the other persons is substantially impaired as a result of the influence of any drug or intoxicant administered to the other person with the other persons consent for the purpose of any kind of medical or dental examination,treatment, or surgery"
            ],
            [
                {
                    type:'select', 
                    options: ["[F4]","[F3]"], 
                    hint: `
                        [F4]
                        [F3] if the offender under division 2(b) substantially impairs the judgement or control of the other person or one of the other persons by administering
                        any controlled substance described in 3719.41 to the person surreptitiously or by force, threat of force, or deception.
                        [F3] where other person is less than 13, regardless of whether offender knows the age.
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2907.05A4',
        content : `
        did FIELD1
        FIELD2,
        a felony of the FIELD3 degree, contrary to and in violation of Section 2907.05 of the Ohio Revised Code.
        `,
        field_options:[
            [
                "have sexual contact with NAME_OF_VICTIM, not the spouse of the offender",
                "cause NAME_OF_VICTIM, not the spouse of the offender,to have sexual contact with the offender",
                "cause two or more persons to have sexual contact",
            ],
            [
                "the other person, or one of the other persons, is less than thirteen years of age whether or not the offender knows the age of that person"
            ],
            [
                {
                    type:'select', 
                    options: ["[F4]","[F3]"], 
                    hint: `
                        [F4]
                        [F3] if the offender under division 2(b) substantially impairs the judgement or control of the other person or one of the other persons by administering
                        any controlled substance described in 3719.41 to the person surreptitiously or by force, threat of force, or deception.
                        [F3] where other person is less than 13, regardless of whether offender knows the age.
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2907.05A5',
        content : `
        did FIELD1
        FIELD2,
        a felony of the FIELD3 degree, contrary to and in violation of Section 2907.05 of the Ohio Revised Code.
        `,
        field_options:[
            [
                "have sexual contact with NAME_OF_VICTIM, not the spouse of the offender",
                "cause NAME_OF_VICTIM, not the spouse of the offender,to have sexual contact with the offender",
                "cause two or more persons to have sexual contact",
            ],
            [
                "the ability of the other person to resist or consent or the ability of one of the other persons to resist or consent is substantially impaired because of a mental or physical condition or because of advanced age, and the offender knows or has reasonable cause to believe that the ability to resist or consent of the other person or one of the other persons is substantially impaired because of a mental or physical condition or because of advanced age"
            ],
            [
                {
                    type:'select', 
                    options: ["[F4]","[F3]"], 
                    hint: `
                        [F4]
                        [F3] if the offender under division 2(b) substantially impairs the judgement or control of the other person or one of the other persons by administering
                        any controlled substance described in 3719.41 to the person surreptitiously or by force, threat of force, or deception.
                        [F3] where other person is less than 13, regardless of whether offender knows the age.
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2907.06',
        content : `
        did FIELD1
        FIELD2,
        a misdemeanor of the FIELD3 degree, contrary to and in violation of Section 2907.06 of the Ohio Revised Code.
        `,
        field_options:[
            [
                "have sexual contact with NAME_OF_VICTIM, not the spouse of the offender",
                "cause NAME_OF_VICTIM, not the spouse of the offender,to have sexual contact with the offender",
                "cause two or more persons to have sexual contact",
            ],
            [
                "the offender knows that the sexual contact is offensive to the other person, or one of the other persons, or is reckless in that regard",
                "the offender knows that the other person’s, or one of the other persons’, ability to appraise the nature of or control the offender’s or the touching person’s conduct is substantially impaired",
                "the offender knows that the other person, or one of the other persons, submits because of being unaware of the sexual contact",
                "the other person or one of the other persons, is 13 years of age or older, but less than 16 years of age, regardless of the offender’s knowledge of this, and the offender is at least 18 and 4 or more years older than such other person",
                "the offender is a mental health professional, the other person or one of the other persons is a mental health client or patient of the offender,and the offender induces the other person who is the client or patient to submit falsely representing to the other person who is the client or patient that the sexual contact is necessary for mental health treatment purposes"
            ],
            [
                {
                    type:'select', 
                    options: ["[M3]","[M1]"], 
                    hint: `
                    [M3]
                    [M1] if prior conviction under this section R.C. 2907.02, 2907.03, 2907.04, 2907.05, or former R.C. 2907.12
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2907.06A1',
        content : `
        did FIELD1
        FIELD2,
        a misdemeanor of the FIELD3 degree, contrary to and in violation of Section 2907.06 of the Ohio Revised Code.
        `,
        field_options:[
            [
                "have sexual contact with NAME_OF_VICTIM, not the spouse of the offender",
                "cause NAME_OF_VICTIM, not the spouse of the offender,to have sexual contact with the offender",
                "cause two or more persons to have sexual contact",
            ],
            [
                "the offender knows that the sexual contact is offensive to the other person, or one of the other persons, or is reckless in that regard"
            ],
            [
                {
                    type:'select', 
                    options: ["[M3]","[M1]"], 
                    hint: `
                    [M3]
                    [M1] if prior conviction under this section R.C. 2907.02, 2907.03, 2907.04, 2907.05, or former R.C. 2907.12
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2907.06A2',
        content : `
        did FIELD1
        FIELD2,
        a misdemeanor of the FIELD3 degree, contrary to and in violation of Section 2907.06 of the Ohio Revised Code.
        `,
        field_options:[
            [
                "have sexual contact with NAME_OF_VICTIM, not the spouse of the offender",
                "cause NAME_OF_VICTIM, not the spouse of the offender,to have sexual contact with the offender",
                "cause two or more persons to have sexual contact",
            ],
            [
                "the offender knows that the other person’s, or one of the other persons’, ability to appraise the nature of or control the offender’s or the touching person’s conduct is substantially impaired"
            ],
            [
                {
                    type:'select', 
                    options: ["[M3]","[M1]"], 
                    hint: `
                    [M3]
                    [M1] if prior conviction under this section R.C. 2907.02, 2907.03, 2907.04, 2907.05, or former R.C. 2907.12
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2907.06A3',
        content : `
        did FIELD1
        FIELD2,
        a misdemeanor of the FIELD3 degree, contrary to and in violation of Section 2907.06 of the Ohio Revised Code.
        `,
        field_options:[
            [
                "have sexual contact with NAME_OF_VICTIM, not the spouse of the offender",
                "cause NAME_OF_VICTIM, not the spouse of the offender,to have sexual contact with the offender",
                "cause two or more persons to have sexual contact",
            ],
            [
                "the offender knows that the other person, or one of the other persons, submits because of being unaware of the sexual contact"
            ],
            [
                {
                    type:'select', 
                    options: ["[M3]","[M1]"], 
                    hint: `
                    [M3]
                    [M1] if prior conviction under this section R.C. 2907.02, 2907.03, 2907.04, 2907.05, or former R.C. 2907.12
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2907.06A4',
        content : `
        did FIELD1
        FIELD2,
        a misdemeanor of the FIELD3 degree, contrary to and in violation of Section 2907.06 of the Ohio Revised Code.
        `,
        field_options:[
            [
                "have sexual contact with NAME_OF_VICTIM, not the spouse of the offender",
                "cause NAME_OF_VICTIM, not the spouse of the offender,to have sexual contact with the offender",
                "cause two or more persons to have sexual contact",
            ],
            [
                "the other person or one of the other persons, is 13 years of age or older, but less than 16 years of age, regardless of the offender’s knowledge of this, and the offender is at least 18 and 4 or more years older than such other person",
            ],
            [
                {
                    type:'select', 
                    options: ["[M3]","[M1]"], 
                    hint: `
                    [M3]
                    [M1] if prior conviction under this section R.C. 2907.02, 2907.03, 2907.04, 2907.05, or former R.C. 2907.12
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2907.07D1',
        content : `
        did solicit FIELD1 by means of a telecommunications device, to engage in sexual activity with FIELD2, FIELD3 being 18 years of age or older
        and FIELD4 being over 12 but less than 16 years of age, to wit FIELD5,
        when FIELD6 knew FIELD7 was 13 of age or older but
        less than 16 years of age or was reckless in that regard and FIELD8,
        is four or more years older than FIELD9, a felony of the FIELD10 degree, contrary to and in violation of Section 2907.07 of the Ohio Revised Code.
        `,
        field_options:[
            ["NAME_OF_VICTIM"],
            ["NAME_OF_DEFENDANT"],
            ["NAME_OF_DEFENDANT"],
            ["NAME_OF_VICTIM"],
            ["AGE_OF_VICTIM"],
            ["NAME_OF_DEFENDANT"],
            ["NAME_OF_VICTIM"],
            ["NAME_OF_DEFENDANT"],
            ["NAME_OF_VICTIM"],
            ["5th","4th"]

        ]
    },
    {
        orc_no : '2907.08A',
        content : `
        for the purpose of sexually arousing or gratifying
        himself/herself did FIELD1 in order to
        FIELD2 Contrary to and violation of Section
        2907.08 of the Revised Code of Ohio.
        `,
        field_options:[
            ["commit trespass","surreptitiously invade the privacy of NAME_OF_VICTIM"],
            ["spy upon NAME_OF_VICTIM","eavesdrop upon NAME_OF_VICTIM"]
        ]
    },
    {
        orc_no : '2907.08A',
        content : `
        for the purpose of sexually arousing or gratifying
        himself/herself did FIELD1 in order to
        FIELD2 Contrary to and violation of Section
        2907.08 of the Revised Code of Ohio.
        `,
        field_options:[
            ["commit trespass","surreptitiously invade the privacy of NAME_OF_VICTIM"],
            ["spy upon NAME_OF_VICTIM","eavesdrop upon NAME_OF_VICTIM"]
        ]
    },
    {
        orc_no : '2907.09A',
        content : `
        did recklessly FIELD1
        under circumstances in which his/her conduct was likely
        to be viewed by and affront others, not members of his/her household, a FIELD1 contrary to
        and in violation of Section 2907.09A of the Ohio Revised Code.
        `,
        field_options:[
            [
                "expose his/her private parts",
                "engage in masturbation",
                "engage in sexual conduct",
                "engage in conduct which to an ordinary observer would appear to be sexual conduct",
                "engage in conduct which to an ordinary observer would appear to be masturbation"
            ],
            [
                {
                    type:'select', 
                    options: ["[M4]","[M3]","[M2]","[M1]"], 
                    hint: `
                    [M4] first offender
                    [M3] one prior conviction
                    [M2] two prior convictions
                    [M1] three prior convictions
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2907.09A1',
        content : `
        did recklessly FIELD1
        under circumstances in which his/her conduct was likely
        to be viewed by and affront others, not members of his/her household, a FIELD1 contrary to
        and in violation of Section 2907.09A of the Ohio Revised Code.
        `,
        field_options:[
            [
                "expose his/her private parts",
                "engage in masturbation"
            ],
            [
                {
                    type:'select', 
                    options: ["[M4]","[M3]","[M2]","[M1]"], 
                    hint: `
                    [M4] first offender
                    [M3] one prior conviction
                    [M2] two prior convictions
                    [M1] three prior convictions
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2907.09A2',
        content : `
        did recklessly FIELD1
        under circumstances in which his/her conduct was likely
        to be viewed by and affront others, not members of his/her household, a FIELD1 contrary to
        and in violation of Section 2907.09A of the Ohio Revised Code.
        `,
        field_options:[
            [
                "engage in sexual conduct"
            ],
            [
                {
                    type:'select', 
                    options: ["[M4]","[M3]","[M2]","[M1]"], 
                    hint: `
                    [M4] first offender
                    [M3] one prior conviction
                    [M2] two prior convictions
                    [M1] three prior convictions
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2907.22',
        content : `
        did knowingly FIELD1 contrary to and
        violation of Section 2907.03 of the Revised Code of Ohio, a felony on the FIELD2 degree.
        `,
        field_options:[
            [
                "establish a brothel",
                "maintain brothel",
                "operate a brothel",
                "manage a brothel",
                "supervise a brothel",
                "control a brothel",
                "having an interest in a brothel",
                "supervise the activities of a prostitute in engaging in sexual activity for hire",
                "manage the activities of a prostitute in engaging in sexual activity for hire",
                "control the activities of a prostitute in engaging in sexual activity for hire",
                "transport across the boundary of this state in order to facilitate his/her engaging in sexual activity for hire",
                "transport across the boundary of a county of this state in order to facilitate his/her engaging in sexual activity for hire",
                "cause to be transported across the boundary of this state in order to facilitate his/her engaging in sexual activity for hire",
                "cause to be transported across the boundary of a county of this state in order to facilitate his/her engaging in sexual activity for hire",
                "induce to engage in sexual activity for hire",
                "procure to engage in sexual activity for hire",
            ],
            [
                {
                    type:'select', 
                    options: ["[4th]","[3rd]"], 
                    hint: `
                    4th
                    3rd if the victim is a minor under 16 years of age and whether or not the defendant knows of such age
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2907.22A1',
        content : `
        did knowingly FIELD1 contrary to and
        violation of Section 2907.03 of the Revised Code of Ohio, a felony on the FIELD2 degree.
        `,
        field_options:[
            [
                "establish a brothel",
                "maintain brothel",
                "operate a brothel",
                "manage a brothel",
                "supervise a brothel",
                "control a brothel",
                "having an interest in a brothel"
            ],
            [
                {
                    type:'select', 
                    options: ["[4th]","[3rd]"], 
                    hint: `
                    4th
                    3rd if the victim is a minor under 16 years of age and whether or not the defendant knows of such age
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2907.22A2',
        content : `
        did knowingly FIELD1 contrary to and
        violation of Section 2907.03 of the Revised Code of Ohio, a felony on the FIELD2 degree.
        `,
        field_options:[
            [
                "supervise the activities of a prostitute in engaging in sexual activity for hire",
                "manage the activities of a prostitute in engaging in sexual activity for hire",
                "control the activities of a prostitute in engaging in sexual activity for hire"
            ],
            [
                {
                    type:'select', 
                    options: ["[4th]","[3rd]"], 
                    hint: `
                    4th
                    3rd if the victim is a minor under 16 years of age and whether or not the defendant knows of such age
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2907.22A3',
        content : `
        did knowingly FIELD1 contrary to and
        violation of Section 2907.03 of the Revised Code of Ohio, a felony on the FIELD2 degree.
        `,
        field_options:[
            [
                "transport across the boundary of this state in order to facilitate his/her engaging in sexual activity for hire",
                "transport across the boundary of a county of this state in order to facilitate his/her engaging in sexual activity for hire",
                "cause to be transported across the boundary of this state in order to facilitate his/her engaging in sexual activity for hire",
                "cause to be transported across the boundary of a county of this state in order to facilitate his/her engaging in sexual activity for hire"
            ],
            [
                {
                    type:'select', 
                    options: ["[4th]","[3rd]"], 
                    hint: `
                    4th
                    3rd if the victim is a minor under 16 years of age and whether or not the defendant knows of such age
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2907.24A',
        content : `
        did solicit FIELD1,
        to engage with him/her in sexual activity for hire, a misdemeanor of the third degree, contrary to and in violation of Section
        2907.24 (A) of the Ohio Revised Code.
        `,
        field_options:[
            ["NAME_OF_VICTIM"]
        ]
    },
    {
        orc_no : '2907.24B',
        content : `
        did solicit FIELD1,
        to engage with him/her in sexual activity for hire, with knowledge that he or she has tested positive as a carrier of a virus that causes AIDS, a felony of the third degree, contrary to and in violation of Section 2907.24 (B) of the Ohio Revised Code.
        `,
        field_options:[
            ["NAME_OF_VICTIM"]
        ]
    },
    {
        orc_no : '2907.25A',
        content : `
        did engage in sexual activity for hire, a misdemeanor of the third degree, contrary to and in violation of Section 2907.25 (A) of the Ohio Revised Code.
        `,
        field_options:[]
    },
    {
        orc_no : '2909.02',
        content : `
        by means of FIELD1, did knowingly FIELD2 a substantial risk of physical harm
        FIELD3,
        located at FIELD4.
        Contrary to and in violation of 2909.02 of the Revised Code of Ohio, a Felony of the FIELD5 degree.
        `,
        field_options:[
            ["fire","explosion"],
            ["cause","create"],
            [
                "to NAME_OF_VICTIM",
                "to an occupied structure",
                "through the offer for hire or other consideration a substantial risk of physical harm to any occupied structure"
            ],
            [{type:"text", value:"LOCATION_OF_INCIDENT", placeholder:"address of the property", hint: "address of the property"}],
            [
                {
                    type:'select', 
                    options: ["[F1]","[F2]"], 
                    hint: `
                    [F1] created a substantial risk of serious physical harm to any person, other than the offender, or created through the offer or
                    acceptance of an agreement for hire or other consideration
                    [F2] cause physical harm to any occupied structure
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2909.02A1',
        content : `
        by means of FIELD1, did knowingly FIELD2 a substantial risk of physical harm
        FIELD3,
        located at FIELD4.
        Contrary to and in violation of 2909.02 of the Revised Code of Ohio, a Felony of the FIELD5 degree.
        `,
        field_options:[
            ["fire","explosion"],
            ["cause","create"],
            [
                "to NAME_OF_VICTIM",
            ],
            [{type:"text", value:"LOCATION_OF_INCIDENT", placeholder:"address of the property", hint: "address of the property"}],
            [
                {
                    type:'select', 
                    options: ["[F1]","[F2]"], 
                    hint: `
                    [F1] created a substantial risk of serious physical harm to any person, other than the offender, or created through the offer or
                    acceptance of an agreement for hire or other consideration
                    [F2] cause physical harm to any occupied structure
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2909.02A2',
        content : `
        by means of FIELD1, did knowingly FIELD2 a substantial risk of physical harm
        FIELD3,
        located at FIELD4.
        Contrary to and in violation of 2909.02 of the Revised Code of Ohio, a Felony of the FIELD5 degree.
        `,
        field_options:[
            ["fire","explosion"],
            ["cause","create"],
            [
                "to an occupied structure"
            ],
            [{type:"text", value:"LOCATION_OF_INCIDENT", placeholder:"address of the property", hint: "address of the property"}],
            [
                {
                    type:'select', 
                    options: ["[F1]","[F2]"], 
                    hint: `
                    [F1] created a substantial risk of serious physical harm to any person, other than the offender, or created through the offer or
                    acceptance of an agreement for hire or other consideration
                    [F2] cause physical harm to any occupied structure
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2909.02A3',
        content : `
        by means of FIELD1, did knowingly FIELD2 a substantial risk of physical harm
        FIELD3,
        located at FIELD4.
        Contrary to and in violation of 2909.02 of the Revised Code of Ohio, a Felony of the FIELD5 degree.
        `,
        field_options:[
            ["fire","explosion"],
            ["cause","create"],
            [
                "through the offer for hire or other consideration a substantial risk of physical harm to any occupied structure"
            ],
            [{type:"text", value:"LOCATION_OF_INCIDENT", placeholder:"address of the property", hint: "address of the property"}],
            [
                {
                    type:'select', 
                    options: ["[F1]","[F2]"], 
                    hint: `
                    [F1] created a substantial risk of serious physical harm to any person, other than the offender, or created through the offer or
                    acceptance of an agreement for hire or other consideration
                    [F2] cause physical harm to any occupied structure
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2909.03A1',
        content : `
        by means of FIELD1, did knowingly FIELD2, cause a substantial risk of physical harm to
        FIELD3, to wit: FIELD4
        contrary to and in violation of Section 2909.03 (A) (1) (2) of the Revised Code of Ohio, a FIELD5.
        `,
        field_options:[
            ["fire","explosion"],
            ["cause","create"],
            ["the property of NAME_OF_VICTIM without his/her consent"],
            [
                {
                    type : 'input', 
                    placeholder:"describe property by location, type and owners name and address (if owner is not defendant)", 
                    hint : "describe property by location, type and owners name and address (if owner is not defendant)"
                }
            ],
            [
                {
                    type:'select', 
                    options: ["[M1]","[F4]","[F3]"], 
                    hint: `
                    [M1] if the value of property amount of physical harm is less than $1,000.00
                    [F4] if the value of property amount of physical harm is $1,000 or more
                    [F3] cause, or create a substantial risk of physical harm through the offer or the acceptance of an agreement for hire or other
                    consideration, to any
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2909.03A2',
        content : `
        by means of FIELD1, did knowingly FIELD2, cause a substantial risk of physical harm to
        FIELD3, to wit: FIELD4
        contrary to and in violation of Section 2909.03 (A) (1) (2) of the Revised Code of Ohio, a FIELD5.
        `,
        field_options:[
            ["fire","explosion"],
            ["cause","create"],
            [
                {
                    type:'select', 
                    options: ["his/her property with purpose to defraud","the property of (owners name) with purpose to defraud"], 
                    onChange: function(){

                        runChangeEventHandler(
                            {
                                select: $(this),
                                searchValue : "the property of (owners name) with purpose to defraud",
                                placeholder : "the property of (owners name) with purpose to defraud",
                                inputValue : "the property of (owners name) with purpose to defraud"
                            }    
                        )
                    }
                }
            ],
            [
                {
                    type : 'input', 
                    placeholder:"describe property by location, type and owners name and address (if owner is not defendant)", 
                    hint : "describe property by location, type and owners name and address (if owner is not defendant)"
                }
            ],
            [
                {
                    type:'select', 
                    options: ["[M1]","[F4]","[F3]"], 
                    hint: `
                    [M1] if the value of property amount of physical harm is less than $1,000.00
                    [F4] if the value of property amount of physical harm is $1,000 or more
                    [F3] cause, or create a substantial risk of physical harm through the offer or the acceptance of an agreement for hire or other
                    consideration, to any
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2909.03A3',
        content : `
        by means of FIELD1, did knowingly FIELD2, a substantial risk of physical harm to
        FIELD3,located at FIELD4
        `,
        field_options:[
            ["fire","explosion"],
            ["cause","create"],
            [
                {
                    type : 'input', 
                    placeholder:"Describe public property", 
                    hint : `"the statehouse" "the courthouse of (insert name of city, county, etc.)" "the (insert name of school)" (describe other structure
                        used for public purposes and owned or controlled by the state, or one of it's political subdivisions, or by a department,
                        agency or instrumentality of either).`
                }
            ],
            [{type:"text", value:"LOCATION_OF_INCIDENT", placeholder:"Insert street address", hint: "Insert street address"}]
        ]
    },
    {
        orc_no : '2909.05A',
        content : `
        did knowingly cause physical harm to FIELD1
        Contrary to and violation of Section 2909.05 of the Revised Code of Ohio. A felony of the FIELD2 degree.
        `,
        field_options:[
            [
                { 
                    type: "text", 
                    placeholder: "the following occupied structure OR the following contents of an occupied structure",
                    hint : `
                        the following occupied structure (describe structure by location, owner’s name, and address)
                        <br/>
                        OR
                        <br/>
                        the following contents of anoccupied structure: (describe the contents and location of structure, location, and owner’s name)
                    `
                }
            ],
            [{ type: "text", placeholder: "Offense Degree" }]
        ]
    },
    {
        orc_no : '2909.06',
        content : `
        FIELD1, did FIELD2
        a substantial risk of physical harm to the property of FIELD3
        without his/her consent, contrary to and in violation of Section 2909.06 of the Ohio Revised Code,
        a misdemeanor/felony of the FIELD4 degree.
        `,
        field_options:[
            [
                "knowingly",
                "recklessly by means of fire",
                "recklessly by means of explosion",
                "recklessly by means of flood",
                "recklessly by means of poison gas",
                "recklessly by means of poison",
                "recklessly by means of radioactive material",
                "recklessly by means of caustic material",
                "recklessly by means of corossive material"
            ],
            ["cause","create"],
            ["NAME_OF_VICTIM at LOCATION_OF_INCIDENT"],
            [
                {
                    type:'select', 
                    options: ["[M2]","[M1]","[F5]","[F4]"], 
                    hint: `
                    [M2] if risk of physical harm to property
                    [M1] if risk of physical harm to a person
                    [F5] if the property involved is an aircraft, an aircraft engine, propeller, appliance, spare part, or any other equipment or
                    implement used or intended to be used in the operation of an aircraft and if thew violation creates a risk of physical
                    harm to a person.
                    [F4] if the property involved is an aircraft, an aircraft engine, propeller, appliance, spare part, or any other equipment or
                    implement used or intended to be used in the operation of an aircraft and if the violation creates a substantial risk of
                    physical harm to person or if it is an occupied aircraft.
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2909.06A1',
        content : `
        FIELD1, did FIELD2
        a substantial risk of physical harm to the property of FIELD3
        without his/her consent, contrary to and in violation of Section 2909.06 of the Ohio Revised Code,
        a misdemeanor/felony of the FIELD4 degree.
        `,
        field_options:[
            [
                "knowingly"
            ],
            ["cause","create"],
            ["NAME_OF_VICTIM at LOCATION_OF_INCIDENT"],
            [
                {
                    type:'select', 
                    options: ["[M2]","[M1]","[F5]","[F4]"], 
                    hint: `
                    [M2] if risk of physical harm to property
                    [M1] if risk of physical harm to a person
                    [F5] if the property involved is an aircraft, an aircraft engine, propeller, appliance, spare part, or any other equipment or
                    implement used or intended to be used in the operation of an aircraft and if thew violation creates a risk of physical
                    harm to a person.
                    [F4] if the property involved is an aircraft, an aircraft engine, propeller, appliance, spare part, or any other equipment or
                    implement used or intended to be used in the operation of an aircraft and if the violation creates a substantial risk of
                    physical harm to person or if it is an occupied aircraft.
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2909.06A2',
        content : `
        FIELD1, did FIELD2
        a substantial risk of physical harm to the property of FIELD3
        without his/her consent, contrary to and in violation of Section 2909.06 of the Ohio Revised Code,
        a misdemeanor/felony of the FIELD4 degree.
        `,
        field_options:[
            [
                "recklessly by means of fire",
                "recklessly by means of explosion",
                "recklessly by means of flood",
                "recklessly by means of poison gas",
                "recklessly by means of poison",
                "recklessly by means of radioactive material",
                "recklessly by means of caustic material",
                "recklessly by means of corossive material"
            ],
            ["cause","create"],
            ["NAME_OF_VICTIM at LOCATION_OF_INCIDENT"],
            [
                {
                    type:'select', 
                    options: ["[M2]","[M1]","[F5]","[F4]"], 
                    hint: `
                    [M2] if risk of physical harm to property
                    [M1] if risk of physical harm to a person
                    [F5] if the property involved is an aircraft, an aircraft engine, propeller, appliance, spare part, or any other equipment or
                    implement used or intended to be used in the operation of an aircraft and if thew violation creates a risk of physical
                    harm to a person.
                    [F4] if the property involved is an aircraft, an aircraft engine, propeller, appliance, spare part, or any other equipment or
                    implement used or intended to be used in the operation of an aircraft and if the violation creates a substantial risk of
                    physical harm to person or if it is an occupied aircraft.
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2909.07A1',
        content : `
        did, without privilege to do so, knowingly FIELD1
        the property of FIELD2, Contrary to and violation of Section 2909.07 of
        the Revised Code of Ohio.
        `,
        field_options:[
            [
                "move",
                "deface",
                "damage",
                "destroy",
                "tamper_with"
            ],
            ["NAME_OF_VICTIM"]
        ]
    },
    {
        orc_no : '2909.09B1',
        content : `
        did knowingly and by any means, FIELD1 an object to wit FIELD2,
        at , onto, or in the path of FIELD3.
        A FIELD4 of the FIELD5, degree contrary to and in violation of Section 2909.09 of the Revised
        Code of Ohio.
        `,
        field_options:[
            [
                "drop",
                "throw"
            ],
            [{ type: "text", placeholder: "Type of object" }],
            [{ type: "text", placeholder: "Type of vehicle" }],
            ["misdemeanor","felony"],
            [
                {
                    type:'select', 
                    options: ["[1st]","[3rd]","[4th]"], 
                    hint: `
                    [1st] misdemeanor
                    [4th] felony 
                    [3rd] felony
                    `
                }
            ]

        ]
    },
    {
        orc_no : '2909.09B2',
        content : `
        did knowingly and by any means, FIELD1 an object to wit FIELD2,
        at , onto, or in the path of FIELD3.
        A FIELD4 of the FIELD5, degree contrary to and in violation of Section 2909.09 of the Revised
        Code of Ohio.
        `,
        field_options:[
            [
                "drop",
                "throw"
            ],
            [{ type: "text", placeholder: "Type of object" }],
            [{ type: "text", placeholder: "Type of vehicle" }],
            ["misdemeanor","felony"],
            [
                {
                    type:'select', 
                    options: ["[1st]","[3rd]","[4th]"], 
                    hint: `
                    [1st] misdemeanor
                    [4th] felony 
                    [3rd] felony
                    `
                }
            ]

        ]
    },
    {
        orc_no : '2911.02',
        content : `
        while FIELD1 did FIELD2
        contrary to and in violation of Section 2911.02 of the Revised Code of Ohio, a Felony of the FIELD3 degree.
        `,
        field_options:[
            [
                "attempting a theft offense as defined in 2913.01 O.R.C", 
                "committing a theft offense as defined in 2913.01 O.R. C"
            ],
            [
                "have a deadly weapon or dangerous ordnance on or about his/her person or under his/her control", 
                "inflict physical harm on NAME_OF_VICTIM",
                "attempt to inflict physical harm on NAME_OF_VICTIM",
                "threaten to inflict physical harm on NAME_OF_VICTIM",
                "use or threaten the immediate use of force against NAME_OF_VICTIM"
            ],
            [
                {
                    type:'select', 
                    options: ["[F2]","[F3]"], 
                    hint: `
                    [F2] 2911.02 (A) (1) (2)
                    [F3] 2911.02 (A) (3)
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2911.02A1',
        content : `
        while FIELD1 did FIELD2
        contrary to and in violation of Section 2911.02 of the Revised Code of Ohio, a Felony of the FIELD3 degree.
        `,
        field_options:[
            [
                "attempting a theft offense as defined in 2913.01 O.R.C", 
                "committing a theft offense as defined in 2913.01 O.R. C"
            ],
            [
                "have a deadly weapon or dangerous ordnance on or about his/her person or under his/her control"
            ],
            [
                {
                    type:'select', 
                    options: ["[F2]","[F3]"], 
                    hint: `
                    [F2] 2911.02 (A) (1) (2)
                    [F3] 2911.02 (A) (3)
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2911.02A2',
        content : `
        while FIELD1 did FIELD2
        contrary to and in violation of Section 2911.02 of the Revised Code of Ohio, a Felony of the FIELD3 degree.
        `,
        field_options:[
            [
                "attempting a theft offense as defined in 2913.01 O.R.C", 
                "committing a theft offense as defined in 2913.01 O.R. C"
            ],
            [
                "inflict physical harm on NAME_OF_VICTIM",
                "attempt to inflict physical harm on NAME_OF_VICTIM",
                "threaten to inflict physical harm on NAME_OF_VICTIM"
            ],
            [
                {
                    type:'select', 
                    options: ["[F2]","[F3]"], 
                    hint: `
                    [F2] 2911.02 (A) (1) (2)
                    [F3] 2911.02 (A) (3)
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2911.02A3',
        content : `
        while FIELD1 did FIELD2
        contrary to and in violation of Section 2911.02 of the Revised Code of Ohio, a Felony of the FIELD3 degree.
        `,
        field_options:[
            [
                "attempting a theft offense as defined in 2913.01 O.R.C", 
                "committing a theft offense as defined in 2913.01 O.R. C"
            ],
            [
                "use or threaten the immediate use of force against NAME_OF_VICTIM"
            ],
            [
                {
                    type:'select', 
                    options: ["[F2]","[F3]"], 
                    hint: `
                    [F2] 2911.02 (A) (1) (2)
                    [F3] 2911.02 (A) (3)
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2911.11A1',
        content : `
        did by FIELD1, trespass in FIELD2 , an occupied structure,
        as defined is section 2909.01 of the Revised Code, or a separately secured or separately occupied portion of
        an occupied structure, when another person other than an accomplice of the offender is present, with the
        purpose to commit therein a criminal offense, and the said FIELD3
        FIELD4 to inflict physical harm on FIELD5
        contrary to and in violation of section 2911.11 of the Revised Code of Ohio, a Felony of the 1st degree.
        `,
        field_options:[
            [
                "force",
                "stealth",
                "deception" 
            ],
            [{ type: "text", placeholder: "describe the occupied structure" }],
            ["NAME_OF_DEFENDANT"],
            ["inflicts","attempts","threatens"],
            ["NAME_OF_VICTIM"]
        ]
    },
    {
        orc_no : '2911.11A2',
        content : `
        did by FIELD1, trespass in FIELD2 , an occupied structure,
        as defined is section 2909.01 of the Revised Code, or a separately secured or separately occupied portion of
        an occupied structure, when another person other than an accomplice of the offender is present, with the
        purpose to commit therein a criminal offense, and the said FIELD3
        had a deadly weapon or dangerous ordnance, as defined in section 2923.11 of the Revised Code, on or about
        his/her person or under his/her control, contrary to and in violation of Section 2911.11 of the Revised Code
        of Ohio, a Felony of the 1st degree.
        `,
        field_options:[
            [
                "force",
                "stealth",
                "deception" 
            ],
            [{ type: "text", placeholder: "describe the occupied structure" }],
            ["NAME_OF_DEFENDANT"]
        ]
    },
    {
        orc_no : '2911.12A1',
        content : `
        did by FIELD1 , trespass in FIELD2 , an
        occupied structure, or in a separately secured or separately occupied portion of an occupied structure, when a
        person, other than an accomplice of the offender, is present, with the purpose to commit therein a criminal
        offense, contrary to and in violation of Section 2911.12 of the Revised Code of Ohio, a Felony of the 2nd degree.
        `,
        field_options:[
            [
                "force",
                "stealth",
                "deception" 
            ],
            [{ type: "text", placeholder: "describe the occupied structure" }]
        ]
    },
    {
        orc_no : '2911.12A2',
        content : `
        did by FIELD1 , trespass in an occupied structure or in a separately secured or
        separately occupied portion of an occupied structure that is the permanent or temporary habitation of
        FIELD2 , when FIELD3
        was present or likely to be present, with the purpose to commit in the habitation a criminal offense to-wit:
        FIELD4 , contrary to and in violation of Section 2911.12 of the
        Revised Code of Ohio, a Felony of the second degree.
        `,
        field_options:[
            [
                "force",
                "stealth",
                "deception" 
            ],
            ["NAME_OF_VICTIM"],
            [{ type: "text", placeholder: "victim/ or any person other than an accomplice of the offender" , hint : "victim/ or any person other than an accomplice of the offender"}],
            [{ type: "text", placeholder: "specify the criminal offense and section number", hint: "specify the criminal offense and section number" }]
        ]
    },
    {
        orc_no : '2911.12A3',
        content : `
        did by FIELD1 , trespass in an occupied structure or in a separately secured or
        separately occupied portion of an occupied structure, with the purpose to commit in the structure or separately
        occupied portion a criminal offense to wit: FIELD2,
        contrary to and in violation of Section 2911.12 of the Revised Code of Ohio, a Felony of the third degree.
        `,
        field_options:[
            [
                "force",
                "stealth",
                "deception" 
            ],
            [{ type: "text", placeholder: "specify the criminal offense and section number", hint: "specify the criminal offense and section number" }]
        ]
    },
    {
        orc_no : '2911.12B',
        content : `
        did by FIELD1 , trespass in a permanent or temporary habitation
        of any person when any person other than an accomplice of the offender is present or likely to be present.
        contrary to and in violation of Section 2911.12 (B) of the Revised Code of Ohio, a Felony of the fourth degree.
        `,
        field_options:[
            [
                "force",
                "stealth",
                "deception" 
            ]
        ]
    },
    {
        orc_no : '2911.13A',
        content : `
        did FIELD1 trespass in FIELD2
        an unoccupied structure, with the purpose to commit therein, FIELD3, contrary to and in violation of section 2911.13 of the Revised Code
        of Ohio, a Felony of the fifth degree
        `,
        field_options:[
            [
                "by force",
                "by stealth",
                "by deception" 
            ],
            [{ type: "text", placeholder: "describe the structure including address", hint: "describe the structure including address" }],
            [
                "a theft offense as defined in section 2913.01",
                "a felony"
            ]
        ]
    },
    {
        orc_no : '2911.21A1',
        content : `
        did, without privilege to do so, knowingly FIELD1 on the land or premises of
        FIELD2 , located at FIELD3,
        contrary to and in violation of Section 2911.21 of the Revised Code of Ohio, a misdemeanor of the 4th degree.
        `,
        field_options:[
            ["enter","remain"],
            ["NAME_OF_VICTIM"],
            ["LOCATION_OF_INCIDENT"]
        ]
    },
    {
        orc_no : '2911.21A2',
        content : `
        did, without privilege to do so, knowingly FIELD1 on the land or premises of
        FIELD2 , located at FIELD3,
        with the purpose to commit a felony, contrary to and in violation of Section 2911.21 of the Revised Code of
        Ohio, a misdemeanor of the 4th degree.
        `,
        field_options:[
            ["enter","remain"],
            ["NAME_OF_VICTIM"],
            ["LOCATION_OF_INCIDENT"]
        ]
    },
    {
        orc_no : '2911.31',
        content : `
        did knowingly, with the purpose to commit an offense, FIELD1
        with a FIELD2 , contrary to and in violation of Section 2911.31 0f the Revised
        Code of Ohio, a Felony of the fourth degree.
        `,
        field_options:[
            ["enter","force an entrance into","tamper"],
            ["vault","safe","strongbox"]
        ]
    },
    {
        orc_no : '2911.32',
        content : `
        did, with purpose to FIELD1 , knowingly, FIELD2 any coin machine, contrary to and in violation of Section 2911.32 of the
        Revised Code of Ohio, a FIELD3 of the FIELD4 degree.
        `,
        field_options:[
            ["commit theft","defraud"],
            ["enter","force an entrance into","tamper with","insert any part of an instrument into"],
            ["misdemeanor","felony"],
            [
                {
                    type:'select', 
                    options: ["[M1]","[F5]"], 
                    hint: `
                    [M1]
                    [F5] if prior conviction of this section or any theft offense
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2911.211',
        content : `
        did, with the purpose to commit a misdemeanor, the elements of which involve causing physical harm to
        another person or causing another person to believe that the said FIELD1
        will cause physical harm to him/her, FIELD2 on the land or premises of FIELD3, contrary to and in violation of Section 2911.211 of the Revised Code of
        Ohio, a misdemeanor of the 1st degree.
        `,
        field_options :
        [
            ["NAME_OF_DEFENDANT"],
            ["enter","remain"],
            ["NAME_OF_VICTIM"]
        ]
    },
    {
        orc_no : '2913.02',
        content : `
        with the
        purpose to deprive FIELD1 thereof, did knowingly FIELD2
        FIELD3
        FIELD4
        FIELD5 A degree, contrary to and in violation of Section 2913.02 of the Revised Code of Ohio.
        `,
        field_options:[
            ["NAME_OF_VICTIM"],
            ["obtain","exert control over"],
            [{ type: "select", data_source: "property", hint : "describe the property including dollar amount if applicable, describe services including dollar amount"}],
            [
                "without the consent of NAME_OF_VICTIM",
                "beyond the scope of the express consent of NAME_OF_VICTIM",
                "beyond the scope of the implied consent of NAME_OF_VICTIM",
                "by deception",
                "by threat"
            ],
            [
                {
                    type:'select', 
                    options: ["[M1]","[F5]","[F4]","[F3]","[F2]","[F1]"], 
                    hint: `
                    [M1] if the value of the property or service is less than $1,000.
                    [F5] if the value of the property or service is $1,000 or more, but less than $7,500. Or if the victim is an elderly person or a disabled adult
                    or if the property is a credit card, printed form for a check or other negotiable instrument which identifies the drawer, maker, or
                    account, a motor vehicle license plate/ temporary license placard or sticker, or blank certificate of title.
                    [F4] if the value of the property or service is $7,500 or more, but less than, $150,000 or if the victim is an elderly person or a disabled
                    adult and the loss of property or service is $1,000 or more but less than $7,500 or if the property is a firearm or dangerous ordnance
                    or a motor vehicle. Or if the property stolen is any dangerous drug.
                    [F3] if the value of the property or service is $150,000 or more but less than $750,000 or if the property stolen is any dangerous drug
                    and the offender has been previously convicted of a felony drug abuse. Or if the victim is an elderly person or a disabled adult
                    and the value of the loss is $7,500 or more but less than $37,500
                    [F2] if the value of the property or service is $750,000 or more but less than $1,500,000 or if the value of the property or service is more
                    than $37,500 but less than, $150,000 and the victim is an elderly person or a disabled adult
                    [F1] if the value of the property or service is $1,500,000 or more or if the value of the property or service is more
                    than$150,000 and the victim is an elderly person or a disabled adult
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2913.02A1',
        content : `
        with the
        purpose to deprive FIELD1 thereof, did knowingly FIELD2
        FIELD3
        FIELD4
        A FIELD5 degree, contrary to and in violation of Section 2913.02 of the Revised Code of Ohio.
        `,
        field_options:[
            ["NAME_OF_VICTIM"],
            ["obtain","exert control over"],
            [{ type: "select", data_source: "property", hint : "describe the property including dollar amount if applicable, describe services including dollar amount"}],
            [
                "without the consent of NAME_OF_VICTIM"
            ],
            [
                {
                    type:'select', 
                    options: ["[M1]","[F5]","[F4]","[F3]","[F2]","[F1]"], 
                    hint: `
                    [M1] if the value of the property or service is less than $1,000.
                    [F5] if the value of the property or service is $1,000 or more, but less than $7,500. Or if the victim is an elderly person or a disabled adult
                    or if the property is a credit card, printed form for a check or other negotiable instrument which identifies the drawer, maker, or
                    account, a motor vehicle license plate/ temporary license placard or sticker, or blank certificate of title.
                    [F4] if the value of the property or service is $7,500 or more, but less than, $150,000 or if the victim is an elderly person or a disabled
                    adult and the loss of property or service is $1,000 or more but less than $7,500 or if the property is a firearm or dangerous ordnance
                    or a motor vehicle. Or if the property stolen is any dangerous drug.
                    [F3] if the value of the property or service is $150,000 or more but less than $750,000 or if the property stolen is any dangerous drug
                    and the offender has been previously convicted of a felony drug abuse. Or if the victim is an elderly person or a disabled adult
                    and the value of the loss is $7,500 or more but less than $37,500
                    [F2] if the value of the property or service is $750,000 or more but less than $1,500,000 or if the value of the property or service is more
                    than $37,500 but less than, $150,000 and the victim is an elderly person or a disabled adult
                    [F1] if the value of the property or service is $1,500,000 or more or if the value of the property or service is more
                    than$150,000 and the victim is an elderly person or a disabled adult
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2913.02A2',
        content : `
        with the
        purpose to deprive FIELD1 thereof, did knowingly FIELD2
        FIELD3
        FIELD4
        FIELD5 A degree, contrary to and in violation of Section 2913.02 of the Revised Code of Ohio.
        `,
        field_options:[
            ["NAME_OF_VICTIM"],
            ["obtain","exert control over"],
            [{ type: "select", data_source: "property", hint : "describe the property including dollar amount if applicable, describe services including dollar amount"}],
            [
                "beyond the scope of the express consent of NAME_OF_VICTIM",
                "beyond the scope of the implied consent of NAME_OF_VICTIM"
            ],
            [
                {
                    type:'select', 
                    options: ["[M1]","[F5]","[F4]","[F3]","[F2]","[F1]"], 
                    hint: `
                    [M1] if the value of the property or service is less than $1,000.
                    [F5] if the value of the property or service is $1,000 or more, but less than $7,500. Or if the victim is an elderly person or a disabled adult
                    or if the property is a credit card, printed form for a check or other negotiable instrument which identifies the drawer, maker, or
                    account, a motor vehicle license plate/ temporary license placard or sticker, or blank certificate of title.
                    [F4] if the value of the property or service is $7,500 or more, but less than, $150,000 or if the victim is an elderly person or a disabled
                    adult and the loss of property or service is $1,000 or more but less than $7,500 or if the property is a firearm or dangerous ordnance
                    or a motor vehicle. Or if the property stolen is any dangerous drug.
                    [F3] if the value of the property or service is $150,000 or more but less than $750,000 or if the property stolen is any dangerous drug
                    and the offender has been previously convicted of a felony drug abuse. Or if the victim is an elderly person or a disabled adult
                    and the value of the loss is $7,500 or more but less than $37,500
                    [F2] if the value of the property or service is $750,000 or more but less than $1,500,000 or if the value of the property or service is more
                    than $37,500 but less than, $150,000 and the victim is an elderly person or a disabled adult
                    [F1] if the value of the property or service is $1,500,000 or more or if the value of the property or service is more
                    than$150,000 and the victim is an elderly person or a disabled adult
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2913.02A3',
        content : `
        with the
        purpose to deprive FIELD1 thereof, did knowingly FIELD2
        FIELD3
        FIELD4
        FIELD5 A degree, contrary to and in violation of Section 2913.02 of the Revised Code of Ohio.
        `,
        field_options:[
            ["NAME_OF_VICTIM"],
            ["obtain","exert control over"],
            [{ type: "select", data_source: "property", hint : "describe the property including dollar amount if applicable, describe services including dollar amount"}],
            [
                "by deception"
            ],
            [
                {
                    type:'select', 
                    options: ["[M1]","[F5]","[F4]","[F3]","[F2]","[F1]"], 
                    hint: `
                    [M1] if the value of the property or service is less than $1,000.
                    [F5] if the value of the property or service is $1,000 or more, but less than $7,500. Or if the victim is an elderly person or a disabled adult
                    or if the property is a credit card, printed form for a check or other negotiable instrument which identifies the drawer, maker, or
                    account, a motor vehicle license plate/ temporary license placard or sticker, or blank certificate of title.
                    [F4] if the value of the property or service is $7,500 or more, but less than, $150,000 or if the victim is an elderly person or a disabled
                    adult and the loss of property or service is $1,000 or more but less than $7,500 or if the property is a firearm or dangerous ordnance
                    or a motor vehicle. Or if the property stolen is any dangerous drug.
                    [F3] if the value of the property or service is $150,000 or more but less than $750,000 or if the property stolen is any dangerous drug
                    and the offender has been previously convicted of a felony drug abuse. Or if the victim is an elderly person or a disabled adult
                    and the value of the loss is $7,500 or more but less than $37,500
                    [F2] if the value of the property or service is $750,000 or more but less than $1,500,000 or if the value of the property or service is more
                    than $37,500 but less than, $150,000 and the victim is an elderly person or a disabled adult
                    [F1] if the value of the property or service is $1,500,000 or more or if the value of the property or service is more
                    than$150,000 and the victim is an elderly person or a disabled adult
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2913.02A4',
        content : `
        with the
        purpose to deprive FIELD1 thereof, did knowingly FIELD2
        FIELD3
        FIELD4
        FIELD5 A degree, contrary to and in violation of Section 2913.02 of the Revised Code of Ohio.
        `,
        field_options:[
            ["NAME_OF_VICTIM"],
            ["obtain","exert control over"],
            [{ type: "select", data_source: "property", hint : "describe the property including dollar amount if applicable, describe services including dollar amount"}],
            [
                "by threat"
            ],
            [
                {
                    type:'select', 
                    options: ["[M1]","[F5]","[F4]","[F3]","[F2]","[F1]"], 
                    hint: `
                    [M1] if the value of the property or service is less than $1,000.
                    [F5] if the value of the property or service is $1,000 or more, but less than $7,500. Or if the victim is an elderly person or a disabled adult
                    or if the property is a credit card, printed form for a check or other negotiable instrument which identifies the drawer, maker, or
                    account, a motor vehicle license plate/ temporary license placard or sticker, or blank certificate of title.
                    [F4] if the value of the property or service is $7,500 or more, but less than, $150,000 or if the victim is an elderly person or a disabled
                    adult and the loss of property or service is $1,000 or more but less than $7,500 or if the property is a firearm or dangerous ordnance
                    or a motor vehicle. Or if the property stolen is any dangerous drug.
                    [F3] if the value of the property or service is $150,000 or more but less than $750,000 or if the property stolen is any dangerous drug
                    and the offender has been previously convicted of a felony drug abuse. Or if the victim is an elderly person or a disabled adult
                    and the value of the loss is $7,500 or more but less than $37,500
                    [F2] if the value of the property or service is $750,000 or more but less than $1,500,000 or if the value of the property or service is more
                    than $37,500 but less than, $150,000 and the victim is an elderly person or a disabled adult
                    [F1] if the value of the property or service is $1,500,000 or more or if the value of the property or service is more
                    than$150,000 and the victim is an elderly person or a disabled adult
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2913.03A',
        content : `
        did knowingly FIELD1 a vehicle to-wit FIELD2 , without the
        consent of FIELD3 , the FIELD4 , contrary to and in violation of Section 2913.03 of the Revised Code of Ohio,
        a Misdemeanor/Felony of the FIELD5 degree.
        `,
        field_options:[
            ["use","operate"],
            [{ type: "text", placeholder : "describe the vehicle" , hint : "describe the vehicle"}],
            ["NAME_OF_VICTIM"],
            ["owner","a person authorized to give consent"],
            [
                {
                    type:'select', 
                    options: ["[M1]","[F5]","[F4]","[F3]","[F2]"], 
                    hint: `
                    [M1] a misdemeanor of the 1st degree,
                    [F5] if the victim of the offense is an elderly person or a disabled adult and the victim incurs a loss,
                    [F4] if the victim is an elderly person or a disabled adult, and the loss to the victim is $1,000.00 or more but less than $7,500.00
                    [F3] If the victim is an elderly person or a disabled adult and the loss is $7,500.00 or more but less than $37,500.00, 
                    [F2] if the loss to the elderly person or disabled adult is $37,500.00 or more
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2913.03B',
        content : `
        did knowingly FIELD1 a vehicle to-wit FIELD2 , without the
        consent of FIELD3 , the FIELD4 , and FIELD5 contrary
        to and in violation of Section 2913.03 of the Revised Code of Ohio, FIELD6 degree.
        `,
        field_options:[
            ["use","operate"],
            [{ type: "text", placeholder : "describe the vehicle" , hint : "describe the vehicle"}],
            ["NAME_OF_VICTIM"],
            ["owner","a person authorized to give consent"],
            ["remove it from this state","kept possession of it for more than forty-eight hours"],
            [
                {
                    type:'select', 
                    options: ["[M1]","[F5]","[F4]","[F3]","[F2]"], 
                    hint: `
                    [M1] a misdemeanor of the 1st degree,
                    [F5] if the victim of the offense is an elderly person or a disabled adult and the victim incurs a loss,
                    [F4] if the victim is an elderly person or a disabled adult, and the loss to the victim is $1,000.00 or more but less than $7,500.00
                    [F3] If the victim is an elderly person or a disabled adult and the loss is $7,500.00 or more but less than $37,500.00, 
                    [F2] if the loss to the elderly person or disabled adult is $37,500.00 or more
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2913.04A',
        content : `
        did knowingly FIELD1 property to wit: FIELD2 , without the consent of
        FIELD3 , the person authorized to give consent,contrary to and in violation of
        Section 2913.04 of the Revised Code of Ohio, a FIELD4 degree.
        `,
        field_options:[
            ["use","operate"],
            [{ type: "text", placeholder : "describe the property" , hint : "describe the property"}],
            ["NAME_OF_VICTIM"],
            [
                {
                    type:'select', 
                    options: ["[M1]","[F5]","[F4]","[F3]","[F2]"], 
                    hint: `
                    Except as otherwise provided in division (F)(3) or (4) of this section, unauthorized use of property is a misdemeanor of the fourth degree.
                    [M1] if the value of the property or service is less than $1,000.
                    [F5] if the value of the property or service $1,000 or more, but less than $7,500. Or if the victim is an elderly person or a disabled adult
                    [F4] if the value of the property or service is $7,500 or more, but less than, $150,000 or if the victim is an elderly person or a disabled
                    adult and the loss of property or service is $1,000 or more but less than $7,500
                    [F3] if the value of the property or service is $150,000 or more, or if the victim is an elderly person or a disabled adult
                    and the value of the loss is $7,500 or more but less than $37,500
                    [F2] if the value of the property or service is $37,500 or more
                    but less than, $150,000 and the victim is an elderly person or a disabled adult
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2913.11',
        content : `
        did, with the purpose to defraud, FIELD1 a check or other
        negotiable instrument, to wit FIELD2 number FIELD3 dated FIELD4
        , in the amount of $ FIELD5 payable to FIELD6 ,
        the said FIELD7 knowing that it would be dishonored,
        contrary to and in violation of 2913.11 of the Revised Code of Ohio, a FIELD8 degree.
        `,
        field_options:[
            ["issue","transfer","cause to be issued","caused to be transferred"],
            [{ type: "text", placeholder : "type of negotiable instrument" , hint : "type of negotiable instrument"}],
            [{ type: "text"}],
            [{ type: "text"}],
            [{ type: "text", placeholder : "amount"}],
            [{ type: "text", placeholder : "name of payee" }],
            ["NAME_OF_DEFENDANT"],
            [
                {
                    type:'select', 
                    options: ["[M]","[F5]","[F4]"], 
                    hint: `
                    [M] if the check or instrument is for less than $1,000.00
                    [F5] if the check or instrument is $1,000.00 or more, but less than $7,500.00
                    [F4] if the check or instrument is $7,500.00 or more, but less
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2913.31A2',
        content : `
        did FIELD1 forge a writing
        to-wit FIELD2 , so that it purported to FIELD3
        contrary to and in violation of Section 2913.31 of the Revised Code of Ohio, FIELD4 degree.
        `,
        field_options:[
            ["with the purpose to defraud","knowing that he/she was facilitating a fraud"],
            [{ type: "select", data_source: "property" , hint : "description of instrument"}],
            [
                "be genuine when it was actually spurious",
                "to be the act of (name of victim) who did not authorize the act",
                "have been executed at a time or place with terms different from what was in fact the case",
                "be a copy of an original when no such original existed"
            ],
            [
                {
                    type:'select', 
                    options: ["[F5]","[F4]","[F3]","[F2]"], 
                    hint: `
                    [F5]
                    [F4] if the value of the property or services or the loss to the victim is $7,500 or more but less than $150,000. If the victim is an elderly
                    person or a disabled adult and the value of the property or service or loss is $1,000 or more, but less than $7,500
                    [F3] if the value of the property or services or the loss to the victim is $150,000 or more. If the victim is an elderly person or a disabled
                    adult and the value of the property or services loss to the victim is $7,500 or more but less than $37,500
                    [F2] if the victim is an elderly person or a disabled adult and the value of the property or services loss to the victim is $37,500 or more.
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2913.31A3',
        content : `
        did FIELD1
        FIELD2 a writing, to-wit FIELD3
        the said FIELD4 knowing it to have been forged, contrary to and
        in violation of Section 2913.31 of the Revised Code of Ohio, a FIELD5 felony of the degree.
        `,
        field_options:[
            ["with the purpose to defraud","knowing that he/she was facilitating a fraud"],
            ["utter","possess with the purpose to utter"],
            [{ type: "select", data_source: "property" , hint : "description instrument"}],
            ["NAME_OF_DEFENDANT"],
            [
                {
                    type:'select', 
                    options: ["[F5]","[F4]","[F3]","[F2]"], 
                    hint: `
                    [F5]
                    [F4] if the value of the property or services or the loss to the victim is $7,500 or more but less than $150,000. If the victim is an elderly
                    person or a disabled adult and the value of the property or service or loss is $1,000 or more, but less than $7,500
                    [F3] if the value of the property or services or the loss to the victim is $150,000 or more. If the victim is an elderly person or a disabled
                    adult and the value of the property or services loss to the victim is $7,500 or more but less than $37,500
                    [F2] if the victim is an elderly person or a disabled adult and the value of the property or services loss to the victim is $37,500 or more.
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2913.31B',
        content : `
        did knowingly FIELD1, contrary to and in violation of
        Section 2913.31 of the Revised Code of Ohio, a misdemeanor of the 1st degree.
        `,
        field_options:[
            ["forge an identification card","sell or otherwise distribute a card that purports to be an identification card, knowing it to have forged"]
        ]
    },
    {
        orc_no : '2913.31B1',
        content : `
        did knowingly FIELD1, contrary to and in violation of
        Section 2913.31 of the Revised Code of Ohio, a misdemeanor of the 1st degree.
        `,
        field_options:[
            ["forge an identification card"]
        ]
    },
    {
        orc_no : '2913.49B1',
        content : `
        did FIELD1 identity of FIELD2, with the intent to fraudulently
        obtain FIELD3
        Contrary to and in violation of Section 2913.49 of the Revised Code of Ohio, a FIELD4 degree.
        `,
        field_options:[
            ["obtain","possess","use","create"],
            ["NAME_OF_VICTIM"],
            ["credit","porperty","service","avoid the payment of a debt","any other legal obligation"],
            [
                {
                    type:'select', 
                    options: ["[F5]","[F4]","[F3]","[F2]","[F1]"], 
                    hint: `
                    [F5] if the value of the credit, property, service, debt, or other legal obligation involved in the violation is less than $1,000
                    [F4] if the value of the credit, property, service, debt, or other legal obligation involved $1,000 or more but less than $7,500
                    [F3] if the value of the credit, property, service, debt, or other legal obligation involved is $7,500 or more but less than $150,000
                    or if the victim is an elderly person or a disabled adult and the loss of property or service is $1,000 or more but less than $7,500
                    [F2] if the value of the credit, property, service, debt, or other legal obligation involved is $150,000 or more or Or if the victim is an
                    elderly person or a disabled adult and the value of the loss is $7,500 or more but less than $150,000
                    [F1] if the value of the property or service is $150,000 or more and the victim is an elderly person or a disabled adult
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2913.51',
        content : `
        did FIELD1 certain property, being, FIELD2, the property of another, one FIELD3,
        the said FIELD4 knowing or having reasonable cause to believe said
        property had been obtained through the commission of a theft offense, contrary to and in violation of
        Section 2913.51 of the Revised Code of Ohio, a FIELD5 degree.
        `,
        field_options:[
            ["receive","retain","dispose of"],
            [{ type: "select", data_source: "property" , hint : "describe the property"}],
            ["NAME_OF_VICTIM"],
            ["NAME_OF_DEFENDANT"],
            [
                {
                    type:'select', 
                    options: ["[M1]","[F5]","[F4]","[F3]"], 
                    hint: `
                    [M1] if the value is less than $1,000.00, a misdemeanor of the 1st degree
                    [F5] if the value is $1,000.00 or more, but less than $7,500.00 or if the property involved is any of the property listed in section 2913.71
                    [F4] if the property is a motor vehicle, as defined in section 4501.01 or the property is a dangerous drug, as defined in section 4729.01
                    or the value is $7,500.00 or more but less than $150,000.00, or the property is a firearm or dangerous ordnance
                    [F3] if the value of the property is $150,000 or more
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2917.11A',
        content : `
        did recklessly cause FIELD1 to another by FIELD2.
        Contrary to and in violation of Section 2917.11 (A) of the Revised Code of Ohio, a FIELD3 degree
        `,
        field_options:[
            ["inconvenience","annoyance","alarm"],
            [
                "engaging in fighting, in threatening harm to persons or property",
                "in engaging in violent or turbulent behavior",
                "making unreasonable noise or an offensively coarse utterance, gesture, or display, or communicating unwarranted and grossly abusive language to any person",
                "insulting, taunting, or challenging another, under circumstances in which that conduct is likely to provoke a violent response",
                "hindering or preventing the movement of persons on a public street, road, highway, or right-of-way, or to, from, within, or upon public or private property, so as to interfere with the rights of others, and by any act that serves no lawful and reasonable purpose of the offender",
                "creating a condition that is physically offensive to persons or that presents a risk of physical harm to persons or property, by any act that serves no lawful and reasonable purpose to the offender"
            ],
            [
                {
                    type:'select', 
                    options: ["minor misdemeanor","4th degree misdemeanor"], 
                    hint: `
                    minor misdemeanor or
                    4th degree misdemeanor if the defendant persisted in conduct after reasonable warning or request to desist
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2917.11A1',
        content : `
        did recklessly cause FIELD1 to another by FIELD2.
        Contrary to and in violation of Section 2917.11 (A) of the Revised Code of Ohio, a FIELD3 degree
        `,
        field_options:[
            ["inconvenience","annoyance","alarm"],
            [
                "engaging in fighting, in threatening harm to persons or property",
                "in engaging in violent or turbulent behavior"
            ],
            [
                {
                    type:'select', 
                    options: ["minor misdemeanor","4th degree misdemeanor"], 
                    hint: `
                    minor misdemeanor or
                    4th degree misdemeanor if the defendant persisted in conduct after reasonable warning or request to desist
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2917.11A2',
        content : `
        did recklessly cause FIELD1 to another by FIELD2.
        Contrary to and in violation of Section 2917.11 (A) of the Revised Code of Ohio, a FIELD3 degree
        `,
        field_options:[
            ["inconvenience","annoyance","alarm"],
            [
                "making unreasonable noise or an offensively coarse utterance, gesture, or display, or communicating unwarranted and grossly abusive language to any person",
            ],
            [
                {
                    type:'select', 
                    options: ["minor misdemeanor","4th degree misdemeanor"], 
                    hint: `
                    minor misdemeanor or
                    4th degree misdemeanor if the defendant persisted in conduct after reasonable warning or request to desist
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2917.11A3',
        content : `
        did recklessly cause FIELD1 to another by FIELD2.
        Contrary to and in violation of Section 2917.11 (A) of the Revised Code of Ohio, a FIELD3 degree
        `,
        field_options:[
            ["inconvenience","annoyance","alarm"],
            [
                "insulting, taunting, or challenging another, under circumstances in which that conduct is likely to provoke a violent response"
            ],
            [
                {
                    type:'select', 
                    options: ["minor misdemeanor","4th degree misdemeanor"], 
                    hint: `
                    minor misdemeanor or
                    4th degree misdemeanor if the defendant persisted in conduct after reasonable warning or request to desist
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2917.11A4',
        content : `
        did recklessly cause FIELD1 to another by FIELD2.
        Contrary to and in violation of Section 2917.11 (A) of the Revised Code of Ohio, a FIELD3 degree
        `,
        field_options:[
            ["inconvenience","annoyance","alarm"],
            [
                "hindering or preventing the movement of persons on a public street, road, highway, or right-of-way, or to, from, within, or upon public or private property, so as to interfere with the rights of others, and by any act that serves no lawful and reasonable purpose of the offender",
            ],
            [
                {
                    type:'select', 
                    options: ["minor misdemeanor","4th degree misdemeanor"], 
                    hint: `
                    minor misdemeanor or
                    4th degree misdemeanor if the defendant persisted in conduct after reasonable warning or request to desist
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2917.11A5',
        content : `
        did recklessly cause FIELD1 to another by FIELD2.
        Contrary to and in violation of Section 2917.11 (A) of the Revised Code of Ohio, a FIELD3 degree
        `,
        field_options:[
            ["inconvenience","annoyance","alarm"],
            [
                "creating a condition that is physically offensive to persons or that presents a risk of physical harm to persons or property, by any act that serves no lawful and reasonable purpose to the offender"
            ],
            [
                {
                    type:'select', 
                    options: ["minor misdemeanor","4th degree misdemeanor"], 
                    hint: `
                    minor misdemeanor or
                    4th degree misdemeanor if the defendant persisted in conduct after reasonable warning or request to desist
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2917.11B',
        content : `
        did, while voluntarily intoxicated FIELD1 engage in conduct likely to
        cause FIELD2 to persons of ordinary sensibilities, which conduct the
        offender, if the offender were not intoxicated, should know is likely to have that effect on others, contrary
        to and in violation of Section 2917.11 (B) of the Revised Code of Ohio, a FIELD3 degree
        `,
        field_options:[
            ["in a public place","in the presence of two or more persons"],
            ["inconvenience","annoyance","alarm"],
            [
                {
                    type:'select', 
                    options: ["minor misdemeanor","4th degree misdemeanor"], 
                    hint: `
                    minor misdemeanor or
                    4th degree misdemeanor if the defendant persisted in conduct after reasonable warning or request to desist
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2917.11B1',
        content : `
        did, while voluntarily intoxicated FIELD1 engage in conduct likely to
        cause FIELD2 to persons of ordinary sensibilities, which conduct the
        offender, if the offender were not intoxicated, should know is likely to have that effect on others, contrary
        to and in violation of Section 2917.11 (B) of the Revised Code of Ohio, a FIELD3 degree
        `,
        field_options:[
            ["in a public place","in the presence of two or more persons"],
            ["annoyance","alarm"],
            [
                {
                    type:'select', 
                    options: ["minor misdemeanor","4th degree misdemeanor"], 
                    hint: `
                    minor misdemeanor or
                    4th degree misdemeanor if the defendant persisted in conduct after reasonable warning or request to desist
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2917.13',
        content : `
        did FIELD1 of a FIELD2 engaged in
        his/her duties at the scene of a FIELD3, contrary to and in violation of
        Section 2917.13 of the Revised Code of Ohio, a FIELD4 degree.
        `,
        field_options:[
            ["hamper the lawful operation","hamper activities of emergency facility person","fail to obey the lawful orders"],
            ["law enforcement officer","firefighter","rescuer","medical person","emergency medical service person"],
            ["fire","accident","disaster","riot","emergency of any kind"],
            [
                {
                    type:'select', 
                    options: ["minor misdemeanor","1st degree misdemeanor"], 
                    hint: `
                    minor misdemeanor or
                    1st degree misdemeanor if the defendant persisted in conduct after reasonable warning or request to desist
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2917.13A1',
        content : `
        did FIELD1 of a FIELD2 engaged in
        his/her duties at the scene of a FIELD3, contrary to and in violation of
        Section 2917.13 of the Revised Code of Ohio, a FIELD4 degree.
        `,
        field_options:[
            ["hamper the lawful operation"],
            ["law enforcement officer","firefighter","rescuer","medical person","emergency medical service person"],
            ["fire","accident","disaster","riot","emergency of any kind"],
            [
                {
                    type:'select', 
                    options: ["minor misdemeanor","1st degree misdemeanor"], 
                    hint: `
                    minor misdemeanor or
                    1st degree misdemeanor if the defendant persisted in conduct after reasonable warning or request to desist
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2917.13A2',
        content : `
        did FIELD1 of a FIELD2 engaged in
        his/her duties at the scene of a FIELD3, contrary to and in violation of
        Section 2917.13 of the Revised Code of Ohio, a FIELD4 degree.
        `,
        field_options:[
            ["hamper activities of emergency facility person"],
            ["law enforcement officer","firefighter","rescuer","medical person","emergency medical service person"],
            ["fire","accident","disaster","riot","emergency of any kind"],
            [
                {
                    type:'select', 
                    options: ["minor misdemeanor","1st degree misdemeanor"], 
                    hint: `
                    minor misdemeanor or
                    1st degree misdemeanor if the defendant persisted in conduct after reasonable warning or request to desist
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2917.21B',
        content : `
        did knowingly FIELD1, a telecommunication to be made from a
        telecommunications device under his/her control, with the purpose to FIELD2 another
        person, to wit: FIELD3, contrary to and in violation of 2917.21 of the
        Revised Code of Ohio, a FIELD4 degree.
        `,
        field_options:[
            ["make","cause to be made","permit"],
            ["abuse","threaten","harass"],
            ["NAME_OF_VICTIM"],
            [
                {
                    type:'select', 
                    options: ["[M]","[F5]"], 
                    hint: `
                    [M] a misdemeanor of the 1st degree for the first offense
                    [F5] a felony of the 5th degree for subsequent offenses
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2917.31',
        content : `
        did cause FIELD1
        by FIELD2 contrary to and in violation of Section 2917.31 of the Revised Code of
        Ohio, a FIELD3 degree.
        `,
        field_options:[
            ["the evacuation of a public place","serious public inconvenience","serious public alarm"],
            [
                "initiating or circulating a report or warning of an alleged or impending fire, explosion, crime, or other catastrophe, knowing that such report or warning was false",
                "threatening to commit an offense of violence",
                "committing an offense, with reckless disregard of the likelihood that its commission will cause serious public inconvenience or alarm"
            ],
            [
                {
                    type:'select', 
                    options: ["[M1]","[F5]","[F4]","[F3]","[F2]"], 
                    hint: `
                    [M1] if the offense results in economic harm of $1,000 or less
                    [F5] if the offense results in economic harm of $1,000 or more but less than $7,500
                    [F4] if the offense results in physical harm to a person, or the economic harm is $7,500 or more but less than $150,000.
                    [F3] if the offense results in economic harm of $150,000 or more
                    [F2] if the public place involved in a violation of division (A)(1) of this section is a school or an institution of higher education
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2917.31A1',
        content : `
        did cause FIELD1
        by FIELD2 contrary to and in violation of Section 2917.31 of the Revised Code of
        Ohio, a FIELD3 degree.
        `,
        field_options:[
            ["the evacuation of a public place","serious public inconvenience","serious public alarm"],
            [
                "initiating or circulating a report or warning of an alleged or impending fire, explosion, crime, or other catastrophe, knowing that such report or warning was false"
            ],
            [
                {
                    type:'select', 
                    options: ["[M1]","[F5]","[F4]","[F3]","[F2]"], 
                    hint: `
                    [M1] if the offense results in economic harm of $1,000 or less
                    [F5] if the offense results in economic harm of $1,000 or more but less than $7,500
                    [F4] if the offense results in physical harm to a person, or the economic harm is $7,500 or more but less than $150,000.
                    [F3] if the offense results in economic harm of $150,000 or more
                    [F2] if the public place involved in a violation of division (A)(1) of this section is a school or an institution of higher education
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2917.31A2',
        content : `
        did cause FIELD1
        by FIELD2 contrary to and in violation of Section 2917.31 of the Revised Code of
        Ohio, a FIELD3 degree.
        `,
        field_options:[
            ["the evacuation of a public place","serious public inconvenience","serious public alarm"],
            [
                "threatening to commit an offense of violence"
            ],
            [
                {
                    type:'select', 
                    options: ["[M1]","[F5]","[F4]","[F3]","[F2]"], 
                    hint: `
                    [M1] if the offense results in economic harm of $1,000 or less
                    [F5] if the offense results in economic harm of $1,000 or more but less than $7,500
                    [F4] if the offense results in physical harm to a person, or the economic harm is $7,500 or more but less than $150,000.
                    [F3] if the offense results in economic harm of $150,000 or more
                    [F2] if the public place involved in a violation of division (A)(1) of this section is a school or an institution of higher education
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2917.31A3',
        content : `
        did cause FIELD1
        by FIELD2 contrary to and in violation of Section 2917.31 of the Revised Code of
        Ohio, a FIELD3 degree.
        `,
        field_options:[
            ["the evacuation of a public place","serious public inconvenience","serious public alarm"],
            [
                "committing an offense, with reckless disregard of the likelihood that its commission will cause serious public inconvenience or alarm"
            ],
            [
                {
                    type:'select', 
                    options: ["[M1]","[F5]","[F4]","[F3]","[F2]"], 
                    hint: `
                    [M1] if the offense results in economic harm of $1,000 or less
                    [F5] if the offense results in economic harm of $1,000 or more but less than $7,500
                    [F4] if the offense results in physical harm to a person, or the economic harm is $7,500 or more but less than $150,000.
                    [F3] if the offense results in economic harm of $150,000 or more
                    [F2] if the public place involved in a violation of division (A)(1) of this section is a school or an institution of higher education
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2917.32',
        content : `
        did FIELD1
        contrary to and in violation of Section 2917.32 of the
        Revised Code of Ohio, a FIELD2 degree.
        `,
        field_options:[
            [
                "initiate or circulate a report or warning of an alleged or impending fire, explosion, crime, or other catastrophe, knowing that such report or warning was false and likely to cause public inconvenience or alarm",
                "knowingly cause a false alarm of fire or other emergency to be transmitted to or within an organization, public or private,for dealing with emergencies involving risk of physical harm to persons or property",
                "report to any law enforcement agency an alleged offense or other incident within its concern, knowing such offense did not occur"
            ],
            [
                {
                    type:'select', 
                    options: ["[M1]","[F5]","[F4]","[F3]"],
                    hint: `
                    [M1]
                    [F5] if the offense results in economic harm of $1,000 or more but less than $7,500, a felony of the 5th degree
                    [F4] if the offense results in economic loss of $7,500 or more but less than $150,000, a felony of the 4th degree
                    [F3] if the offense results in economic loss of $150,000.00 or more, or if a violation of this section pertains to a purported,
                    threatened, or actual use of a weapon of mass destruction
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2917.32A1',
        content : `
        did FIELD1
        contrary to and in violation of Section 2917.32 of the
        Revised Code of Ohio, a FIELD2 degree.
        `,
        field_options:[
            [
                "initiate or circulate a report or warning of an alleged or impending fire, explosion, crime, or other catastrophe, knowing that such report or warning was false and likely to cause public inconvenience or alarm"
            ],
            [
                {
                    type:'select', 
                    options: ["[M1]","[F5]","[F4]","[F3]"],
                    hint: `
                    [M1]
                    [F5] if the offense results in economic harm of $1,000 or more but less than $7,500, a felony of the 5th degree
                    [F4] if the offense results in economic loss of $7,500 or more but less than $150,000, a felony of the 4th degree
                    [F3] if the offense results in economic loss of $150,000.00 or more, or if a violation of this section pertains to a purported,
                    threatened, or actual use of a weapon of mass destruction
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2917.32A2',
        content : `
        did FIELD1
        contrary to and in violation of Section 2917.32 of the
        Revised Code of Ohio, a FIELD2 degree.
        `,
        field_options:[
            [
                "knowingly cause a false alarm of fire or other emergency to be transmitted to or within an organization, public or private,for dealing with emergencies involving risk of physical harm to persons or property",
            ],
            [
                {
                    type:'select', 
                    options: ["[M1]","[F5]","[F4]","[F3]"],
                    hint: `
                    [M1]
                    [F5] if the offense results in economic harm of $1,000 or more but less than $7,500, a felony of the 5th degree
                    [F4] if the offense results in economic loss of $7,500 or more but less than $150,000, a felony of the 4th degree
                    [F3] if the offense results in economic loss of $150,000.00 or more, or if a violation of this section pertains to a purported,
                    threatened, or actual use of a weapon of mass destruction
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2917.32A3',
        content : `
        did FIELD1
        contrary to and in violation of Section 2917.32 of the
        Revised Code of Ohio, a FIELD2 degree.
        `,
        field_options:[
            [
                "report to any law enforcement agency an alleged offense or other incident within its concern, knowing such offense did not occur"
            ],
            [
                {
                    type:'select', 
                    options: ["[M1]","[F5]","[F4]","[F3]"],
                    hint: `
                    [M1]
                    [F5] if the offense results in economic harm of $1,000 or more but less than $7,500, a felony of the 5th degree
                    [F4] if the offense results in economic loss of $7,500 or more but less than $150,000, a felony of the 4th degree
                    [F3] if the offense results in economic loss of $150,000.00 or more, or if a violation of this section pertains to a purported,
                    threatened, or actual use of a weapon of mass destruction
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2919.22A',
        content : `
        being the FIELD1 of a child,
        FIELD2 ,to
        wit: FIELD3 , did create a substantial risk to
        the FIELD4 of such child by violating a duty of FIELD5
        a contrary to and in violation of Section 2919.22 FIELD6 of the Ohio Revised Code.
        `,
        field_options:[
            ["parent","guardian","custodian","person having custody","person having control","person in loco parentis"],
            [
                "under eighteen years of age or",
                "under twenty-one years of age and mentally handicapped",
                "under twenty-one years of age and physically handicapped",
            ],
            ["NAME_OF_VICTIM"],
            ["health","safety"],
            ["care","protection","support"],
            [
                {
                    type:'select', 
                    options: ["[M1]","[F5]","[F4]","[F3]","[F2]"]
                }
            ]
        ]
    },
    {
        orc_no : '2919.23',
        content : `
        did FIELD1 ,
        FIELD2 , FIELD3 ,
        a FIELD4 contrary to and in violation of Section 2919.23 of the Ohio Revised Code.
        `,
        field_options:[
            ["knowingly he/she was without privilege to do so","being reckless in that regard"],
            ["entice","take","keep","harbor"],
            [
                "child under the age of eighteen",
                "a mentally/physically handicapped child under age twenty-one",
                "a person committed by law to an institution for delinquent/unruly/neglected/abused",
                "dependent children",
                "a person committed by law to an institution for the mentally ill/mentally retarded"
            ],
            [
                {
                    type:'select', 
                    options: ["[M1]","[M3]","[F4]","[F5]"]
                }
            ]
        ]
    },
    {
        orc_no : '2919.23A1',
        content : `
        did FIELD1 ,
        FIELD2 , FIELD3 ,
        a FIELD4 contrary to and in violation of Section 2919.23 of the Ohio Revised Code.
        `,
        field_options:[
            ["knowingly he/she was without privilege to do so","being reckless in that regard"],
            ["entice","take","keep","harbor"],
            [
                "child under the age of eighteen",
                "a mentally/physically handicapped child under age twenty-one"
            ],
            [
                {
                    type:'select', 
                    options: ["[M1]","[M3]","[F4]","[F5]"]
                }
            ]
        ]
    },
    {
        orc_no : '2919.23A2',
        content : `
        did FIELD1 ,
        FIELD2 , FIELD3 ,
        a FIELD4 contrary to and in violation of Section 2919.23 of the Ohio Revised Code.
        `,
        field_options:[
            ["knowingly he/she was without privilege to do so","being reckless in that regard"],
            ["entice","take","keep","harbor"],
            [
                "a person committed by law to an institution for delinquent/unruly/neglected/abused"
            ],
            [
                {
                    type:'select', 
                    options: ["[M1]","[M3]","[F4]","[F5]"]
                }
            ]
        ]
    },
    {
        orc_no : '2919.23A3',
        content : `
        did FIELD1 ,
        FIELD2 , FIELD3 ,
        a FIELD4 contrary to and in violation of Section 2919.23 of the Ohio Revised Code.
        `,
        field_options:[
            ["knowingly he/she was without privilege to do so","being reckless in that regard"],
            ["entice","take","keep","harbor"],
            [
                "a person committed by law to an institution for the mentally ill/mentally retarded"
            ],
            [
                {
                    type:'select', 
                    options: ["[M1]","[M3]","[F4]","[F5]"]
                }
            ]
        ]
    },
    {
        orc_no : '2919.24',
        content : `
        did FIELD1 FIELD2
        a child or ward of the juvenile court becoming FIELD3.
        Contrary to and in violation of Section 2919.24 of the Revised Code of Ohio, a Misdemeanor of the 1st degree.
        `,
        field_options:[
            ["aid","abet","induce","cause","encourage","contribute to","act in a way tending to cause"],
            ["NAME_OF_VICTIM"],
            [
                "a child or ward of the juvenile court becoming an unruly child as defined is section 2151.022 of the Revised Code of Ohio",
                "a child or a ward of the juvenile court becoming a delinquent child as defined in section 2151.02 of the Revised Code of Ohio"
            ]
        ]
    },
    {
        orc_no : '2919.24A1',
        content : `
        did FIELD1 FIELD2
        a child or ward of the juvenile court becoming FIELD3.
        Contrary to and in violation of Section 2919.24 of the Revised Code of Ohio, a Misdemeanor of the 1st degree.
        `,
        field_options:[
            ["aid","abet","induce","cause","encourage","contribute to"],
            ["NAME_OF_VICTIM"],
            [
                "a child or ward of the juvenile court becoming an unruly child as defined is section 2151.022 of the Revised Code of Ohio",
                "a child or a ward of the juvenile court becoming a delinquent child as defined in section 2151.02 of the Revised Code of Ohio"
            ]
        ]
    },
    {
        orc_no : '2919.24A2',
        content : `
        did FIELD1 FIELD2
        a child or ward of the juvenile court becoming FIELD3.
        Contrary to and in violation of Section 2919.24 of the Revised Code of Ohio, a Misdemeanor of the 1st degree.
        `,
        field_options:[
            ["act in a way tending to cause"],
            ["NAME_OF_VICTIM"],
            [
                "a child or ward of the juvenile court becoming an unruly child as defined is section 2151.022 of the Revised Code of Ohio",
                "a child or a ward of the juvenile court becoming a delinquent child as defined in section 2151.02 of the Revised Code of Ohio"
            ]
        ]
    },
    {
        orc_no : '2919.25',
        content : `
        did FIELD1 physical harm to FIELD2, a family or household member as defined in R.C. 2919.25 (E), contrary to
        and in violation of Section 2919.25 of the Revised Code of Ohio, a FIELD3 degree.
        `,
        field_options:[
            ["knowingly cause","knowingly attempt to cause","recklessly cause serious"],
            ["NAME_OF_VICTIM"],
            [
                {
                    type:'select', 
                    options: ["[M1]","[F5]"],
                    hint: `
                    [M1]
                    [F5] if the offender has previously been convicted of domestic violence, or a violation of a municipal ordinance that is
                    substantially similar to domestic violence, or a violation of 2903.11, 2903.12, 2903.13, 2903.14, 2903.21, 2903.211
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2919.25A',
        content : `
        did FIELD1 physical harm to FIELD2, a family or household member as defined in R.C. 2919.25 (E), contrary to
        and in violation of Section 2919.25 of the Revised Code of Ohio, a FIELD3 degree.
        `,
        field_options:[
            ["knowingly cause","knowingly attempt to cause"],
            ["NAME_OF_VICTIM"],
            [
                {
                    type:'select', 
                    options: ["[M1]","[F5]"],
                    hint: `
                    [M1]
                    [F5] if the offender has previously been convicted of domestic violence, or a violation of a municipal ordinance that is
                    substantially similar to domestic violence, or a violation of 2903.11, 2903.12, 2903.13, 2903.14, 2903.21, 2903.211
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2919.25B',
        content : `
        did FIELD1 physical harm to FIELD2, a family or household member as defined in R.C. 2919.25 (E), contrary to
        and in violation of Section 2919.25 of the Revised Code of Ohio, a FIELD3 degree.
        `,
        field_options:[
            ["recklessly cause serious"],
            ["NAME_OF_VICTIM"],
            [
                {
                    type:'select', 
                    options: ["[M1]","[F5]"],
                    hint: `
                    [M1]
                    [F5] if the offender has previously been convicted of domestic violence, or a violation of a municipal ordinance that is
                    substantially similar to domestic violence, or a violation of 2903.11, 2903.12, 2903.13, 2903.14, 2903.21, 2903.211
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2919.25C',
        content : `
        did knowingly, by threat of force, cause FIELD1, a family or household member, as defined in R.C. 2919.25 (E), to believe that he/she would cause imminent physical harm to FIELD2, Contrary to, and in violation of R.C.2919.25 (C),
        a FIELD3 of the FIELD4 degree.
        `,
        field_options:[
            ["NAME_OF_VICTIM"],
            ["NAME_OF_VICTIM"],
            ["felony","misdemeanor"],
            [{ type: "text", placeholder:"numerical designation of the degree"}]
        ]
    },
    {
        orc_no : '2919.27',
        content : `
        did FIELD1,
        the order violated was granted by the Honorable FIELD2,
        FIELD3 in the on FIELD4,
        FIELD5,a FIELD6 , contrary to and in violation of Section 2919.27,
        of the Ohio Revised Code.
        `,
        field_options:[
            [
                "recklessly violate any terms of protection order issued or consent agreement approved pursuant to R.C. 2919.26 or 3113.31",
                "recklessly violate any terms of a protection order issued pursuant to R.C. 2903.21.3 or 2903.21.4” or “recklessly violate any terms of protection order issued by a court of another state"
            ],
            [{ type: "text", placeholder:"Judge’s or Magistrates name"}],
            [{ type: "text", placeholder:"Court that issued Order"}],
            [{ type: "text", placeholder:"date order was issued"}],
            [{ type: "text", placeholder:"case number on the Order that was violated"}],
            [
                {
                    type:'select', 
                    options: ["[M1]","[F5]"],
                    hint: `
                    [M1]
                    [F5] if one or more prior convictions/guilty pleas under this section or two or more violations of R.C. 2903.21.1 or 2911.21.1, involving same
                    person who is subject of protection order or consent agreement.
                    [F5] if previous conviction or guilty plea to two or more violations of this section or of former R.C. 2919.27 involving a protection order issued
                    pursuant to R.C. 2903.21.3 or 2903.21.4, two or more violations of R.C. 2903.21, 2903.21.2, 2903.22, or 2911.21.1 that involve the same
                    person who is the subject of the protection order, or two or violations of R.C. 2903.21.4 as it existed prior to July 1,1996
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2919.27',
        content : `
        did FIELD1,
        the order violated was granted by the Honorable FIELD2,
        FIELD3 in the on FIELD4,
        FIELD5,a FIELD6 , contrary to and in violation of Section 2919.27,
        of the Ohio Revised Code.
        `,
        field_options:[
            [
                "recklessly violate any terms of protection order issued or consent agreement approved pursuant to R.C. 2919.26 or 3113.31",
                "recklessly violate any terms of a protection order issued pursuant to R.C. 2903.21.3 or 2903.21.4",
                "recklessly violate any terms of protection order issued by a court of another state"
            ],
            [{ type: "text", placeholder:"Judge’s or Magistrates name"}],
            [{ type: "text", placeholder:"Court that issued Order"}],
            [{ type: "text", placeholder:"date order was issued"}],
            [{ type: "text", placeholder:"case number on the Order that was violated"}],
            [
                {
                    type:'select', 
                    options: ["[M1]","[F5]"],
                    hint: `
                    [M1]
                    [F5] if one or more prior convictions/guilty pleas under this section or two or more violations of R.C. 2903.21.1 or 2911.21.1, involving same
                    person who is subject of protection order or consent agreement.
                    [F5] if previous conviction or guilty plea to two or more violations of this section or of former R.C. 2919.27 involving a protection order issued
                    pursuant to R.C. 2903.21.3 or 2903.21.4, two or more violations of R.C. 2903.21, 2903.21.2, 2903.22, or 2911.21.1 that involve the same
                    person who is the subject of the protection order, or two or violations of R.C. 2903.21.4 as it existed prior to July 1,1996
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2919.27A1',
        content : `
        did FIELD1,
        the order violated was granted by the Honorable FIELD2,
        FIELD3 in the on FIELD4,
        FIELD5,a FIELD6 , contrary to and in violation of Section 2919.27,
        of the Ohio Revised Code.
        `,
        field_options:[
            [
                "recklessly violate any terms of protection order issued or consent agreement approved pursuant to R.C. 2919.26 or 3113.31"
            ],
            [{ type: "text", placeholder:"Judge’s or Magistrates name"}],
            [{ type: "text", placeholder:"Court that issued Order"}],
            [{ type: "text", placeholder:"date order was issued"}],
            [{ type: "text", placeholder:"case number on the Order that was violated"}],
            [
                {
                    type:'select', 
                    options: ["[M1]","[F5]"],
                    hint: `
                    [M1]
                    [F5] if one or more prior convictions/guilty pleas under this section or two or more violations of R.C. 2903.21.1 or 2911.21.1, involving same
                    person who is subject of protection order or consent agreement.
                    [F5] if previous conviction or guilty plea to two or more violations of this section or of former R.C. 2919.27 involving a protection order issued
                    pursuant to R.C. 2903.21.3 or 2903.21.4, two or more violations of R.C. 2903.21, 2903.21.2, 2903.22, or 2911.21.1 that involve the same
                    person who is the subject of the protection order, or two or violations of R.C. 2903.21.4 as it existed prior to July 1,1996
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2919.27A2',
        content : `
        did FIELD1,
        the order violated was granted by the Honorable FIELD2,
        FIELD3 in the on FIELD4,
        FIELD5,a FIELD6 , contrary to and in violation of Section 2919.27,
        of the Ohio Revised Code.
        `,
        field_options:[
            [
                "recklessly violate any terms of a protection order issued pursuant to R.C. 2903.21.3 or 2903.21.4"
            ],
            [{ type: "text", placeholder:"Judge’s or Magistrates name"}],
            [{ type: "text", placeholder:"Court that issued Order"}],
            [{ type: "text", placeholder:"date order was issued"}],
            [{ type: "text", placeholder:"case number on the Order that was violated"}],
            [
                {
                    type:'select', 
                    options: ["[M1]","[F5]"],
                    hint: `
                    [M1]
                    [F5] if one or more prior convictions/guilty pleas under this section or two or more violations of R.C. 2903.21.1 or 2911.21.1, involving same
                    person who is subject of protection order or consent agreement.
                    [F5] if previous conviction or guilty plea to two or more violations of this section or of former R.C. 2919.27 involving a protection order issued
                    pursuant to R.C. 2903.21.3 or 2903.21.4, two or more violations of R.C. 2903.21, 2903.21.2, 2903.22, or 2911.21.1 that involve the same
                    person who is the subject of the protection order, or two or violations of R.C. 2903.21.4 as it existed prior to July 1,1996
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2919.27A3',
        content : `
        did FIELD1,
        the order violated was granted by the Honorable FIELD2,
        FIELD3 in the on FIELD4,
        FIELD5,a FIELD6 , contrary to and in violation of Section 2919.27,
        of the Ohio Revised Code.
        `,
        field_options:[
            [
                "recklessly violate any terms of protection order issued by a court of another state"
            ],
            [{ type: "text", placeholder:"Judge’s or Magistrates name"}],
            [{ type: "text", placeholder:"Court that issued Order"}],
            [{ type: "text", placeholder:"date order was issued"}],
            [{ type: "text", placeholder:"case number on the Order that was violated"}],
            [
                {
                    type:'select', 
                    options: ["[M1]","[F5]"],
                    hint: `
                    [M1]
                    [F5] if one or more prior convictions/guilty pleas under this section or two or more violations of R.C. 2903.21.1 or 2911.21.1, involving same
                    person who is subject of protection order or consent agreement.
                    [F5] if previous conviction or guilty plea to two or more violations of this section or of former R.C. 2919.27 involving a protection order issued
                    pursuant to R.C. 2903.21.3 or 2903.21.4, two or more violations of R.C. 2903.21, 2903.21.2, 2903.22, or 2911.21.1 that involve the same
                    person who is the subject of the protection order, or two or violations of R.C. 2903.21.4 as it existed prior to July 1,1996
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2919.04A',
        content : `
        did FIELD1 FIELD2, FIELD3,
        the victim of a crime, in the FIELD4 of criminal charges,
        contrary to and in violation of Section 2921.04(a) of the Ohio Revised Code.
        `,
        field_options:[
            ["knowingly","knowingly attempt to"],
            ["intimidate","hinder"],
            ["NAME_OF_VICTIM"],
            ["filing","prosecution"]
        ]
    },
    {
        orc_no : '2921.12A1',
        content : `
        knowing that an official FIELD1 was FIELD2, did FIELD3
        A FIELD4 to wit FIELD5
        with purpose to impair its FIELD6 as evidence in
        such. FIELD7, contrary to and in violation of
        Section 2921.12of the Ohio Revised Code.
        `,
        field_options:[
            [
                {
                    type:'select', 
                    options: [
                        "in an official proceeding",
                        "with purpose to incriminate another",
                        "with purpose to mislead a public official in performing his/her official function",
                        "with purpose to secure the issuance by a governmental agency of a license",
                        "with purpose to secure the issuance by a governmental agency of a permit",
                        "with purpose to secure the issuance by a governmental agency of a authorization",
                        "with purpose to secure the issuance by a governmental agency of a certificate",
                        "with purpose to secure the issuance by a governmental agency of a registration",
                        "with purpose to secure the issuance by a governmental agency of a release",
                        "under oath before a notary public",
                        "under oath before a (describe other person empowered to administer oaths)",
                        "under affirmation before a notary public",
                        "under affirmation before a (describe other person empowered to administer oaths)",
                        "in writing",
                        "in connection with a report which is required by law",
                        "in connection with a report which is authorized by law",
                        "in connection with a return which is required by law",
                        "in connection with a return which is authorized by law"
                    ], 
                    onChange: function(){

                        runChangeEventHandler(
                            {
                                select: $(this),
                                searchValue : "describe other person empowered to administer oaths",
                                placeholder : "describe other person empowered to administer oaths"
                            }    
                        )

                        if( $(this).val().includes("describe other person empowered to administer oaths"))
                        {
                            $(this).after(`<input placeholder="describe other person empowered to administer oaths" class="field_input"/>`);
                            $(this).parent().append(`
                                <button type="button" class="btn btn-danger" onclick="$(this).hide();$(this).prev().hide();$(this).prev().prev().show();">Cancel</button>
                            `);
                            $(this).hide();
                        }
                        else{
                            $(this).siblings('.field_input , button').remove();
                        }
                    }
                }
            ],
            ["make a false statement","swear the truth of a false statement previously made","affirm the truth of a false statement previously made"],
            [
                "alter",
                "destroy",
                "conceal",
                "remove"
            ],
            ["record","document","thing"],
            [{ type: "select", data_source: "property", hint : "Describe document or thing"}],
            ["value","availability"],
            ["proceeding","investigation"]
        ]
    },
    {
        orc_no : '2921.13',
        content : `
        FIELD1
        did knowingly FIELD2, contrary to and in violation of Section 2921.13 of the Ohio Revised Code.
        `,
        field_options:[
            [
                {
                    type:'select', 
                    options: [
                        "in an official proceeding",
                        "with purpose to incriminate another",
                        "with purpose to mislead a public official in performing his/her official function",
                        "with purpose to secure the issuance by a governmental agency of a license",
                        "with purpose to secure the issuance by a governmental agency of a permit",
                        "with purpose to secure the issuance by a governmental agency of a authorization",
                        "with purpose to secure the issuance by a governmental agency of a certificate",
                        "with purpose to secure the issuance by a governmental agency of a registration",
                        "with purpose to secure the issuance by a governmental agency of a release",
                        "under oath before a notary public",
                        "under oath before a (describe other person empowered to administer oaths)",
                        "under affirmation before a notary public",
                        "under affirmation before a (describe other person empowered to administer oaths)",
                        "in writing",
                        "in connection with a report which is required by law",
                        "in connection with a report which is authorized by law",
                        "in connection with a return which is required by law",
                        "in connection with a return which is authorized by law"
                    ], 
                    onChange: function(){

                        runChangeEventHandler(
                            {
                                select: $(this),
                                searchValue : "describe other person empowered to administer oaths",
                                placeholder : "describe other person empowered to administer oaths"
                            }    
                        )
                    }
                }
            ],
            ["make a false statement","swear the truth of a false statement previously made","affirm the truth of a false statement previously made"]
        ]
    },
    {
        orc_no : '2921.13A1',
        content : `
        FIELD1
        did knowingly FIELD2, contrary to and in violation of Section 2921.13 of the Ohio Revised Code.
        `,
        field_options:[
            [
                {
                    type:'select', 
                    options: [
                        "in an official proceeding"
                    ]
                }
            ],
            ["make a false statement","swear the truth of a false statement previously made","affirm the truth of a false statement previously made"]
        ]
    },
    {
        orc_no : '2921.13A2',
        content : `
        FIELD1
        did knowingly FIELD2, contrary to and in violation of Section 2921.13 of the Ohio Revised Code.
        `,
        field_options:[
            [
                {
                    type:'select', 
                    options: [
                        "with purpose to incriminate another",
                    ]
                }
            ],
            ["make a false statement","swear the truth of a false statement previously made","affirm the truth of a false statement previously made"]
        ]
    },
    {
        orc_no : '2921.13A3',
        content : `
        FIELD1
        did knowingly FIELD2, contrary to and in violation of Section 2921.13 of the Ohio Revised Code.
        `,
        field_options:[
            [
                {
                    type:'select', 
                    options: [
                        "with purpose to mislead a public official in performing his/her official function"
                    ]
                }
            ],
            ["make a false statement","swear the truth of a false statement previously made","affirm the truth of a false statement previously made"]
        ]
    },
    {
        orc_no : '2921.13A5',
        content : `
        FIELD1
        did knowingly FIELD2, contrary to and in violation of Section 2921.13 of the Ohio Revised Code.
        `,
        field_options:[
            [
                {
                    type:'select', 
                    options: [
                        "with purpose to secure the issuance by a governmental agency of a license",
                        "with purpose to secure the issuance by a governmental agency of a permit",
                        "with purpose to secure the issuance by a governmental agency of a authorization",
                        "with purpose to secure the issuance by a governmental agency of a certificate",
                        "with purpose to secure the issuance by a governmental agency of a registration",
                        "with purpose to secure the issuance by a governmental agency of a release",
                    ]
                }
            ],
            ["make a false statement","swear the truth of a false statement previously made","affirm the truth of a false statement previously made"]
        ]
    },
    {
        orc_no : '2921.13A6',
        content : `
        FIELD1
        did knowingly FIELD2, contrary to and in violation of Section 2921.13 of the Ohio Revised Code.
        `,
        field_options:[
            [
                {
                    type:'select', 
                    options: [
                        "under oath before a notary public",
                        "under oath before a (describe other person empowered to administer oaths)",
                        "under affirmation before a notary public",
                        "under affirmation before a (describe other person empowered to administer oaths)",
                    ], 
                    onChange: function(){

                        runChangeEventHandler(
                            {
                                select: $(this),
                                searchValue : "describe other person empowered to administer oaths",
                                placeholder : "describe other person empowered to administer oaths"
                            }    
                        )
                    }
                }
            ],
            ["make a false statement","swear the truth of a false statement previously made","affirm the truth of a false statement previously made"]
        ]
    },
    {
        orc_no : '2921.13A7',
        content : `
        FIELD1
        did knowingly FIELD2, contrary to and in violation of Section 2921.13 of the Ohio Revised Code.
        `,
        field_options:[
            [
                {
                    type:'select', 
                    options: [
                        "in writing",
                        "in connection with a report which is required by law",
                        "in connection with a report which is authorized by law",
                        "in connection with a return which is required by law",
                        "in connection with a return which is authorized by law"
                    ]
                }
            ],
            ["make a false statement","swear the truth of a false statement previously made","affirm the truth of a false statement previously made"]
        ]
    },
    {
        orc_no : '2921.31',
        content : `
        did, without privilege to do so and with purpose to FIELD1
        the performance by a public official of an authorized act within the public official’s official capacity,
        did FIELD2 a public official in the performance of the public official’s lawful duties,
        contrary to and in violation of Section 2921.31 of the Revised Code of Ohio, a FIELD3 of FIELD4 the degree.
        `,
        field_options:[
            [
                "prevent",
                "obstruct",
                "delay"
            ],
            ["hampered","impeded"],
            ["misdemeanor","felony"],
            ["1st","2nd","3rd","4th","5th"]
        ]
    },
    {
        orc_no : '2921.32',
        content : `
        without privilege to do so and with purpose to FIELD1
        , did FIELD2
        , contrary to and in
        violation of Section 2921.32 of the Revised Code of Ohio. a FIELD3 of the
        FIELD4 degree.
        `,
        field_options:[
            [
                {
                    type:'select', 
                    options: [
                        "hinder the discovery of (insert name) for crime",
                        "hinder the apprehension of (insert name) for crime",
                        "hinder the prosecution of (insert name) for crime",
                        "hinder the conviction) of (insert name) for crime",
                        "hinder the punishment of (insert name) for crime",
                        "assist (insert name) to benefit from the commission of a crime"
                    ], 
                    onChange: function(){

                        runChangeEventHandler(
                            {
                                select: $(this),
                                inputValue : $(this).val(),
                                placeholder : $(this).val()
                            }    
                        )
                    }
                }
            ],
            [
                {
                    type:'select', 
                    options: [
                        "harbor such person",
                        "conceal such person",
                        "provide such person with money",
                        "provide such person with transportation",
                        "provide such person with a weapon",
                        "provide such person with a disguise",
                        "provide such person with a (describe other means of avoiding discovery or apprehension)",
                        "warn such person of impending discovery",
                        "warn such person of impending apprehension",
                        "destroy physical evidence of the crime",
                        "conceal physical evidence of the crime",
                        "induce (name of person) to withhold testimony",
                        "induce (name of person) to withhold information",
                        "induce (name of person) to elude legal process summoning him to testify",
                        "induce (name of person) to elude legal process summoning him to supply evidence",
                        "communicate false information to (name of person)"
                    ], 
                    onChange: function(){

                        runChangeEventHandler(
                            {
                                select: $(this),
                                searchValue : [
                                    "describe other means of avoiding discovery or apprehension",
                                    "(name of person)"
                                ],
                                inputValue : $(this).val(),
                                placeholder : $(this).val()
                            }    
                        )
                    }
                }
            ],
            ["misdemeanor","felony"],
            ["1st","2nd","3rd","4th","5th"]
        ]
    },
    {
        orc_no : '2921.32A1',
        content : `
        without privilege to do so and with purpose to FIELD1
        , did FIELD2
        , contrary to and in
        violation of Section 2921.32 of the Revised Code of Ohio. a FIELD3 of the
        FIELD4 degree.
        `,
        field_options:[
            [
                {
                    type:'select', 
                    options: [
                        "hinder the discovery of (insert name) for crime",
                        "hinder the apprehension of (insert name) for crime",
                        "hinder the prosecution of (insert name) for crime",
                        "hinder the conviction) of (insert name) for crime",
                        "hinder the punishment of (insert name) for crime",
                        "assist (insert name) to benefit from the commission of a crime"
                    ], 
                    onChange: function(){

                        runChangeEventHandler(
                            {
                                select: $(this),
                                inputValue : $(this).val(),
                                placeholder : $(this).val()
                            }    
                        )
                    }
                }
            ],
            [
                {
                    type:'select', 
                    options: [
                        "harbor such person",
                        "conceal such person"
                    ]
                }

            ],
            ["misdemeanor","felony"],
            ["1st","2nd","3rd","4th","5th"]
        ]
    },
    {
        orc_no : '2921.32A2',
        content : `
        without privilege to do so and with purpose to FIELD1
        , did FIELD2
        , contrary to and in
        violation of Section 2921.32 of the Revised Code of Ohio. a FIELD3 of the
        FIELD4 degree.
        `,
        field_options:[
            [
                {
                    type:'select', 
                    options: [
                        "hinder the discovery of (insert name) for crime",
                        "hinder the apprehension of (insert name) for crime",
                        "hinder the prosecution of (insert name) for crime",
                        "hinder the conviction) of (insert name) for crime",
                        "hinder the punishment of (insert name) for crime",
                        "assist (insert name) to benefit from the commission of a crime"
                    ], 
                    onChange: function(){

                        runChangeEventHandler(
                            {
                                select: $(this),
                                inputValue : $(this).val(),
                                placeholder : $(this).val()
                            }    
                        )
                    }
                }
            ],
            [
                {
                    type:'select', 
                    options: [
                        "provide such person with money",
                        "provide such person with transportation",
                        "provide such person with a weapon",
                        "provide such person with a disguise",
                        "provide such person with a (describe other means of avoiding discovery or apprehension)"
                    ], 
                    onChange: function(){

                        runChangeEventHandler(
                            {
                                select: $(this),
                                searchValue : [
                                    "describe other means of avoiding discovery or apprehension",
                                    "(name of person)"
                                ],
                                inputValue : $(this).val(),
                                placeholder : $(this).val()
                            }    
                        )
                    }
                }
            ],
            ["misdemeanor","felony"],
            ["1st","2nd","3rd","4th","5th"]
        ]
    },
    {
        orc_no : '2921.32A3',
        content : `
        without privilege to do so and with purpose to FIELD1
        , did FIELD2
        , contrary to and in
        violation of Section 2921.32 of the Revised Code of Ohio. a FIELD3 of the
        FIELD4 degree.
        `,
        field_options:[
            [
                {
                    type:'select', 
                    options: [
                        "hinder the discovery of (insert name) for crime",
                        "hinder the apprehension of (insert name) for crime",
                        "hinder the prosecution of (insert name) for crime",
                        "hinder the conviction) of (insert name) for crime",
                        "hinder the punishment of (insert name) for crime",
                        "assist (insert name) to benefit from the commission of a crime"
                    ], 
                    onChange: function(){

                        runChangeEventHandler(
                            {
                                select: $(this),
                                inputValue : $(this).val(),
                                placeholder : $(this).val()
                            }    
                        )
                    }
                }
            ],
            [
                {
                    type:'select', 
                    options: [
                        "warn such person of impending discovery",
                        "warn such person of impending apprehension"
                    ]
                }

            ],
            ["misdemeanor","felony"],
            ["1st","2nd","3rd","4th","5th"]
        ]
    },
    {
        orc_no : '2921.32A4',
        content : `
        without privilege to do so and with purpose to FIELD1
        , did FIELD2
        , contrary to and in
        violation of Section 2921.32 of the Revised Code of Ohio. a FIELD3 of the
        FIELD4 degree.
        `,
        field_options:[
            [
                {
                    type:'select', 
                    options: [
                        "hinder the discovery of (insert name) for crime",
                        "hinder the apprehension of (insert name) for crime",
                        "hinder the prosecution of (insert name) for crime",
                        "hinder the conviction) of (insert name) for crime",
                        "hinder the punishment of (insert name) for crime",
                        "assist (insert name) to benefit from the commission of a crime"
                    ], 
                    onChange: function(){

                        runChangeEventHandler(
                            {
                                select: $(this),
                                inputValue : $(this).val(),
                                placeholder : $(this).val()
                            }    
                        )
                    }
                }
            ],
            [
                {
                    type:'select', 
                    options: [
                        "destroy physical evidence of the crime",
                        "conceal physical evidence of the crime",
                        "induce (name of person) to withhold testimony",
                        "induce (name of person) to withhold information"
                    ], 
                    onChange: function(){

                        runChangeEventHandler(
                            {
                                select: $(this),
                                searchValue : [
                                    "describe other means of avoiding discovery or apprehension",
                                    "(name of person)"
                                ],
                                inputValue : $(this).val(),
                                placeholder : $(this).val()
                            }    
                        )
                    }
                }
            ],
            ["misdemeanor","felony"],
            ["1st","2nd","3rd","4th","5th"]
        ]
    },
    {
        orc_no : '2921.32A5',
        content : `
        without privilege to do so and with purpose to FIELD1
        , did FIELD2
        , contrary to and in
        violation of Section 2921.32 of the Revised Code of Ohio. a FIELD3 of the
        FIELD4 degree.
        `,
        field_options:[
            [
                {
                    type:'select', 
                    options: [
                        "hinder the discovery of (insert name) for crime",
                        "hinder the apprehension of (insert name) for crime",
                        "hinder the prosecution of (insert name) for crime",
                        "hinder the conviction) of (insert name) for crime",
                        "hinder the punishment of (insert name) for crime",
                        "assist (insert name) to benefit from the commission of a crime"
                    ], 
                    onChange: function(){

                        runChangeEventHandler(
                            {
                                select: $(this),
                                inputValue : $(this).val(),
                                placeholder : $(this).val()
                            }    
                        )
                    }
                }
            ],
            [
                {
                    type:'select', 
                    options: [
                        "communicate false information to (name of person)"
                    ], 
                    onChange: function(){

                        runChangeEventHandler(
                            {
                                select: $(this),
                                searchValue : [
                                    "describe other means of avoiding discovery or apprehension",
                                    "(name of person)"
                                ],
                                inputValue : $(this).val(),
                                placeholder : $(this).val()
                            }    
                        )
                   }
                }

            ],
            ["misdemeanor","felony"],
            ["1st","2nd","3rd","4th","5th"]
        ]
    },
    {
        orc_no : '2921.32A6',
        content : `
        without privilege to do so and with purpose to FIELD1
        , did FIELD2
        , contrary to and in
        violation of Section 2921.32 of the Revised Code of Ohio. a FIELD3 of the
        FIELD4 degree.
        `,
        field_options:[
            [
                {
                    type:'select', 
                    options: [
                        "hinder the discovery of (insert name) for crime",
                        "hinder the apprehension of (insert name) for crime",
                        "hinder the prosecution of (insert name) for crime",
                        "hinder the conviction) of (insert name) for crime",
                        "hinder the punishment of (insert name) for crime",
                        "assist (insert name) to benefit from the commission of a crime"
                    ], 
                    onChange: function(){

                        runChangeEventHandler(
                            {
                                select: $(this),
                                inputValue : $(this).val(),
                                placeholder : $(this).val()
                            }    
                        )
                    }
                }
            ],
            [
                {
                    type:'select', 
                    options: [
                        "induce (name of person) to elude legal process summoning him to testify",
                        "induce (name of person) to elude legal process summoning him to supply evidence"
                    ], 
                    onChange: function(){

                        runChangeEventHandler(
                            {
                                select: $(this),
                                searchValue : [
                                    "describe other means of avoiding discovery or apprehension",
                                    "(name of person)"
                                ],
                                inputValue : $(this).val(),
                                placeholder : $(this).val()
                            }    
                        )
                    }
                }

            ],
            ["misdemeanor","felony"],
            ["1st","2nd","3rd","4th","5th"]
        ]
    },
    {
        orc_no : '2921.33A',
        content : `
        did FIELD1, FIELD2 with the lawful arrest of FIELD3 , contrary to and in violation of Section 2921.33 of the Revised Code of Ohio a Misdemeanor of the second degree.
        `,
        field_options:[
            ["recklessly","by force"],
            ["resist","interfere"],
            [{ type:"text" , placeholder:"name of person being arrested"}]
        ]
    },
    {
        orc_no : '2921.33B',
        content : `
        did FIELD1, FIELD2 with the lawful arrest of FIELD3 , and FIELD4 of the resistance or interference, cause physical
        harm to FIELD5 a law enforcement officer, contrary to and in violation of
        Section 2921.33 of the Revised Code of Ohio, a Misdemeanor of the first degree.        
        `,
        field_options:[
            ["recklessly","by force"],
            ["resist","interfere"],
            [{ type:"text" , placeholder:"name of person being arrested"}],
            ["during the course","as a result"],
            [{ type:"text" , placeholder:"name of law enforcement officer"}]
        ]
    },
    {
        orc_no : '2921.33C1',
        content : `
        did FIELD1, FIELD2 with the lawful arrest of FIELD3 , and FIELD4 of the resistance or interference, the said
        FIELD5 , recklessly caused physical harm to FIELD6
        a law enforcement officer, by means of a deadly weapon contrary to and in violation of Section 2921.33 of the
        Revised Code of Ohio, a Felony of the fourth degree.        
        `,
        field_options:[
            ["recklessly","by force"],
            ["resist","interfere"],
            [{ type:"text" , placeholder:"name of person being arrested"}],
            ["during the course","as a result"],
            ["NAME_OF_DEFENDANT"],
            [{ type:"text" , placeholder:"name of law enforcement officer"}]
        ]
    },
    {
        orc_no : '2921.34',
        content : `
        FIELD1 he/she was under detention
        did purposely
        FIELD2
        contrary to and in violation of Section 2921.34 of the Revised Code of Ohio, a FIELD3 of FIELD4 the degree.  
        `,
        field_options:[
            ["knowing","being reckless with to regard to whether"],
            [
                "break such detention",
                "attempt to break such detention",
                "fail to return to detention following temporary leave granted for a specific purpose",
                "fail to return to detention following temporary leave granted for a limited period",
                "fail to return to detention at the time required when serving a sentence in intermittent confinement"
            ],
            ["misdemeanor","felony"],
            ["1st","2nd","3rd","4th","5th"]
        ]
    },
    {
        orc_no : '2921.331',
        content : `
        did FIELD1
        contrary to and in violation of Section 2921.331 of the Revised Code of Ohio, a FIELD2 degree.  
        `,
        field_options:[
            [
                "fail to comply with a lawful order or direction of a police officer invested with authority to direct, control, or regulate traffic",
                "operate a motor vehicle, as defined in section 4501.01 of the O.R.C., so as willfully to elude or flee a police officer after receiving a visible or audible signal from a police officer to bring the person's motor vehicle to a stop"
            ],
            [
                {
                    type:'select', 
                    options: ["[M]","[F4]"],
                    hint: `
                    2921.331 (A) [M] Misdemeanor of the 1st degree
                    2921.331 (B) [F4] if the operation of the motor vehicle caused serious physical harm to persons or property, or the operation of the
                    motor vehicle caused substantial risk of serious physical harm to persons or property.
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2921.331A',
        content : `
        did FIELD1
        contrary to and in violation of Section 2921.331 of the Revised Code of Ohio, a [M] degree.  
        `,
        field_options:[
            [
                "fail to comply with a lawful order or direction of a police officer invested with authority to direct, control, or regulate traffic"
            ]
        ]
    },
    {
        orc_no : '2923.02',
        content : `
        did FIELD1 , and with sufficient culpability for commission of a violation of Section
        FIELD2 of the Revised Code of Ohio, engage in conduct that, if successful, would constitute
        or result in a violation of Section FIELD3 of the Revised Code, contrary to and in violation of
        Section 2923.02 of the Revised Code of Ohio, a FIELD4 degree. 
        `,
        field_options:[
            ["purposely","knowingly"],
            [{ type:"text" , placeholder:"offense and section number"}],
            [{ type:"text" , placeholder:"offense and section number"}],
            [{ type:"text" , placeholder:"Offense Degree", hint : `
                When attempt to commit aggravated murder, murder, or offense for which maximum penalty is life, a felony of the 1st degree.
                An attempt to commit a drug offense for which the penalty is determined by the amount or number of unit doses of the controlled
                substance involved in drug abuse offense is an offense of the same degree as the drug abuse offense attempt would be if that drug
                abuse offense had been committed and had involved an amount or number of unit doses of the controlled substance that is within
                the next lower range of controlled substance amounts than was involved in the attempt. An attempt to commit any other offense is
                an offense of the next lower degree than the offense attempted.
            `}]
        ]
    },
    {
        orc_no : '2923.03A2',
        content : `
        did FIELD1 FIELD2 FIELD3 to commit a
        violation of Section FIELD4 of the Revised Code of Ohio, contrary to and in violation of
        2923.03 of the Revised Code of Ohio, a FIELD5 degree.
        `,
        field_options:[
            ["purposely","knowingly","recklessly","negligently"],
            ["aid","abet"],
            [{ type:"text" , placeholder:"name of other"}],
            [{ type:"text" , placeholder:"offense and section number"}],
            [{ type:"text" , placeholder:"Offense Degree", hint : `
                degree of offense (Penalty: the same as the principal offense, it may also be charges as the principal offense.
            `}]
        ]
    },
    {
        orc_no : '2923.12A',
        content : `
        did knowingly FIELD1, concealed FIELD2,
        a deadly weapon other than a handgun, deadly weapon or dangerous ordnance, to wit: FIELD3.
        Contrary to and in violation of Section 2923.12A of the Revised Code of Ohio, a FIELD4 degree.
        `,
        field_options:[
            ["carry","have"],
            ["on his/her person","ready at hand"],
            [{ type: "select", data_source: "property", hint : "describe the deadly weapon or dangerous ordnance"}],
            [
                {
                    type:'select', 
                    options: ["[M1]","[F4]","[F3]"],
                    hint: `
                    [M1] a Misdemeanor of the 1st degree
                    [F4] if the weapon was loaded or the ammunition was ready at hand, or the weapon was a dangerous ordnance, or if there is
                    a prior conviction for carrying a concealed weapon or an offense of violence.
                    [F3] if the weapon is a firearm and at the premises for which a D liquor permit has been issued, or if the offense was
                    committed aboard an aircraft.
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2923.12A1',
        content : `
        did knowingly FIELD1, concealed FIELD2,
        a deadly weapon other than a handgun to wit: FIELD3.
        Contrary to and in violation of Section 2923.12A of the Revised Code of Ohio, a FIELD4 degree.
        `,
        field_options:[
            ["carry","have"],
            ["on his/her person","ready at hand"],
            [{ type: "select", data_source: "property", hint : "describe the deadly weapon or dangerous ordnance"}],
            [
                {
                    type:'select', 
                    options: ["[M1]","[F4]","[F3]"],
                    hint: `
                    [M1] a Misdemeanor of the 1st degree
                    [F4] if the weapon was loaded or the ammunition was ready at hand, or the weapon was a dangerous ordnance, or if there is
                    a prior conviction for carrying a concealed weapon or an offense of violence.
                    [F3] if the weapon is a firearm and at the premises for which a D liquor permit has been issued, or if the offense was
                    committed aboard an aircraft.
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2923.12A2',
        content : `
        did knowingly FIELD1, concealed FIELD2,
        a handgun other than a dangerous ordnance, to wit: FIELD3.
        Contrary to and in violation of Section 2923.12A of the Revised Code of Ohio, a FIELD4 degree.
        `,
        field_options:[
            ["carry","have"],
            ["on his/her person","ready at hand"],
            [{ type: "select", data_source: "property", hint : "describe the deadly weapon or dangerous ordnance"}],
            [
                {
                    type:'select', 
                    options: ["[M1]","[F4]","[F3]"],
                    hint: `
                    [M1] a Misdemeanor of the 1st degree
                    [F4] if the weapon was loaded or the ammunition was ready at hand, or the weapon was a dangerous ordnance, or if there is
                    a prior conviction for carrying a concealed weapon or an offense of violence.
                    [F3] if the weapon is a firearm and at the premises for which a D liquor permit has been issued, or if the offense was
                    committed aboard an aircraft.
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2923.12A3',
        content : `
        did knowingly FIELD1, concealed FIELD2,
        a dangerous ordnance, to wit: FIELD3.
        Contrary to and in violation of Section 2923.12A of the Revised Code of Ohio, a FIELD4 degree.
        `,
        field_options:[
            ["carry","have"],
            ["on his/her person","ready at hand"],
            [{ type: "select", data_source: "property", hint : "describe the deadly weapon or dangerous ordnance"}],
            [
                {
                    type:'select', 
                    options: ["[M1]","[F4]","[F3]"],
                    hint: `
                    [M1] a Misdemeanor of the 1st degree
                    [F4] if the weapon was loaded or the ammunition was ready at hand, or the weapon was a dangerous ordnance, or if there is
                    a prior conviction for carrying a concealed weapon or an offense of violence.
                    [F3] if the weapon is a firearm and at the premises for which a D liquor permit has been issued, or if the offense was
                    committed aboard an aircraft.
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2923.13',
        content : `
        who has been issued a license or temporary emergency license to carry a concealed handgun under section 2923.125 or 2923.1213 of the Revised Code or a license to carry a concealed handgun that was issued by another state with which the attorney general has entered into a reciprocity agreement under section 109.69 of the Revised Code, who is stopped for a law enforcement purpose, and who is carrying a concealed handgun shall fail to promptly inform any law enforcement officer who approaches him/her after him/her has been stopped that him/her has been issued a license or temporary emergency license to carry a concealed handgun and that the him/her then is carrying a concealed handgun, contrary to and in violation of Section 2923.12B of the Revised Code of Ohio, a misdemeanor of the fourth degree.
        `,
        field_options:[]
    },
    {
        orc_no : '2923.13',
        content : `
        did knowingly FIELD1 to wit: FIELD2
        FIELD3
        Contrary to and in violation of Section 2923.13 of the Revised Code of Ohio, a felony of the FIELD4 degree.
        `,
        field_options:[
            [
                "acquire a firearm",
                "acquire a dangerous ordinance",
                "have a firearm",
                "have a dangerous ordinance",
                "carry a firearm",
                "carry a dangerous ordinance",
                "use a firearm",
                "use a dangerous ordinance"
            ],
            [{ type: "select", data_source: "property", hint : "describe the weapon"}],
            [
                {
                    type:'select', 
                    options: [
                        "being a fugitive from justice",
                        "being under indictment",
                        "having been convicted of a felony offense of violence",
                        "having been adjudged adelinquent child for a commission of an offense that, if committed by an adult, would have been a felony offense of violence to-wit :",
                        "was under indictment for or having been convicted of an offense involving the illegal possession a drug of abuse, to-wit: ",
                        "was under indictment for or having been convicted of an offense involving the illegal use a drug of abuse, to-wit: ",
                        "was under indictment for or having been convicted of an offense involving the illegal sale a drug of abuse, to-wit: ",
                        "was under indictment for or having been convicted of an offense involving the illegal administration a drug of abuse, to-wit: ",
                        "was under indictment for or having been convicted of an offense involving the illegal distribution a drug of abuse, to-wit: ",
                        "was under indictment for or having been convicted of an offense involving the illegal trafficking in a drug of abuse, to-wit: ",
                        "adjudicated a delinquent child for the commission of an offense that, if committed by an adult, would have been a felony offense of violence, involving the illegal possession, use, sale, administration, distribution, or trafficking in a drug of abuse, to-wit: ",
                        "is drug dependent, in danger of drug dependence",
                        "is a chronic alcoholic",
                        "was under adjudication of mental incompetence"
                    ], 
                    onChange: function(){

                        runChangeEventHandler(
                            {
                                select: $(this),
                                searchValue : "to-wit",
                                placeholder : "to-wit"
                            }    
                        )
                    }
                }
            ],
            ["[F5]","[F4]","[F3]","[F2]","[F1]"]
        ]
    },
    {
        orc_no : '2923.13A1',
        content : `
        did knowingly FIELD1 to wit: FIELD2
        FIELD3
        Contrary to and in violation of Section 2923.13 of the Revised Code of Ohio, a felony of the FIELD4 degree.
        `,
        field_options:[
            [
                "acquire a firearm",
                "acquire a dangerous ordinance",
                "have a firearm",
                "have a dangerous ordinance",
                "carry a firearm",
                "carry a dangerous ordinance",
                "use a firearm",
                "use a dangerous ordinance"
            ],
            [{ type: "select", data_source: "property", hint : "describe the weapon"}],
            ["being a fugitive from justice"],
            ["[F5]","[F4]","[F3]","[F2]","[F1]"]
        ]
    },
    {
        orc_no : '2923.13A2',
        content : `
        did knowingly FIELD1 to wit: FIELD2
        FIELD3
        Contrary to and in violation of Section 2923.13 of the Revised Code of Ohio, a felony of the FIELD4 degree.
        `,
        field_options:[
            [
                "acquire a firearm",
                "acquire a dangerous ordinance",
                "have a firearm",
                "have a dangerous ordinance",
                "carry a firearm",
                "carry a dangerous ordinance",
                "use a firearm",
                "use a dangerous ordinance"
            ],
            [{ type: "select", data_source: "property", hint : "describe the weapon"}],
            [
                {
                    type:'select', 
                    options: [
                        "being under indictment",
                        "having been convicted of a felony offense of violence",
                        "having been adjudged adelinquent child for a commission of an offense that, if committed by an adult, would have been a felony offense of violence to-wit :",
                    ], 
                    onChange: function(){

                        runChangeEventHandler(
                            {
                                select: $(this),
                                searchValue : "to-wit",
                                placeholder : "to-wit"
                            }    
                        )
                    }
                }
            ],
            ["[F5]","[F4]","[F3]","[F2]","[F1]"]
        ]
    },
    {
        orc_no : '2923.13A3',
        content : `
        did knowingly FIELD1 to wit: FIELD2
        FIELD3
        Contrary to and in violation of Section 2923.13 of the Revised Code of Ohio, a felony of the FIELD4 degree.
        `,
        field_options:[
            [
                "acquire a firearm",
                "acquire a dangerous ordinance",
                "have a firearm",
                "have a dangerous ordinance",
                "carry a firearm",
                "carry a dangerous ordinance",
                "use a firearm",
                "use a dangerous ordinance"
            ],
            [{ type: "select", data_source: "property", hint : "describe the weapon"}],
            [
                {
                    type:'select', 
                    options: [
                        "was under indictment for or having been convicted of an offense involving the illegal possession a drug of abuse, to-wit: ",
                        "was under indictment for or having been convicted of an offense involving the illegal use a drug of abuse, to-wit: ",
                        "was under indictment for or having been convicted of an offense involving the illegal sale a drug of abuse, to-wit: ",
                        "was under indictment for or having been convicted of an offense involving the illegal administration a drug of abuse, to-wit: ",
                        "was under indictment for or having been convicted of an offense involving the illegal distribution a drug of abuse, to-wit: ",
                        "was under indictment for or having been convicted of an offense involving the illegal trafficking in a drug of abuse, to-wit: ",
                        "adjudicated a delinquent child for the commission of an offense that, if committed by an adult, would have been a felony offense of violence, involving the illegal possession, use, sale, administration, distribution, or trafficking in a drug of abuse, to-wit: ",
                    ], 
                    onChange: function(){

                        runChangeEventHandler(
                            {
                                select: $(this),
                                searchValue : "to-wit",
                                placeholder : "to-wit"
                            }    
                        )
                    }
                }
            ],
            ["[F5]","[F4]","[F3]","[F2]","[F1]"]
        ]
    },
    {
        orc_no : '2923.13A4',
        content : `
        did knowingly FIELD1 to wit: FIELD2
        FIELD3
        Contrary to and in violation of Section 2923.13 of the Revised Code of Ohio, a felony of the FIELD4 degree.
        `,
        field_options:[
            [
                "acquire a firearm",
                "acquire a dangerous ordinance",
                "have a firearm",
                "have a dangerous ordinance",
                "carry a firearm",
                "carry a dangerous ordinance",
                "use a firearm",
                "use a dangerous ordinance"
            ],
            [{ type: "select", data_source: "property", hint : "describe the weapon"}],
            [
                {
                    type:'select', 
                    options: [
                       "is drug dependent, in danger of drug dependence",
                        "is a chronic alcoholic"
                    ]
                }

            ],
            ["[F5]","[F4]","[F3]","[F2]","[F1]"]
        ]
    },
    {
        orc_no : '2923.13A5',
        content : `
        did knowingly FIELD1 to wit: FIELD2
        FIELD3
        Contrary to and in violation of Section 2923.13 of the Revised Code of Ohio, a felony of the FIELD4 degree.
        `,
        field_options:[
            [
                "acquire a firearm",
                "acquire a dangerous ordinance",
                "have a firearm",
                "have a dangerous ordinance",
                "carry a firearm",
                "carry a dangerous ordinance",
                "use a firearm",
                "use a dangerous ordinance"
            ],
            [{ type: "select", data_source: "property", hint : "describe the weapon"}],
            ["was under adjudication of mental incompetence"],
            ["[F5]","[F4]","[F3]","[F2]","[F1]"]
        ]
    },
    {
        orc_no : '2923.15',
        content : `
        did, while under the influence of alcohol or a drug of abuse FIELD1 a firearm or dangerous
        ordnance, to-wit FIELD2 , contrary to and in violation of Section 2923.15 of the
        Revised Code of Ohio, a Misdemeanor of the first degree.
        `,
        field_options:[
            ["carry","use"],
            [{ type: "select", data_source: "property", hint : "describe the weapon"}]
        ]
    },
    {
        orc_no : '2923.16B',
        content : `
        did knowingly FIELD1 a loaded firearm in a motor vehicle, FIELD2
        in such a manner that the firearm was accessible to the operator or a passenger without leaving the vehicle,
        contrary to and in violation of Section 2923.16 of the Revised Code of Ohio, a misdemeanor of the first degree.
        `,
        field_options:[
            ["transport","have"],
            [{ type: "text", placeholder: "describe the vehicle", hint : "describe the vehicle"}]
        ]
    },
    {
        orc_no : '2923.16C',
        content : `
        did knowingly FIELD1 a loaded firearm in a motor vehicle, FIELD2
        which was not both unloaded and carried FIELD3
        contrary to and in violation of Section 2923.16 of the Revised Code of Ohio, a misdemeanor of the fourth degree.
        `,
        field_options:[
            ["transport","have"],
            [{ type: "text", placeholder: "describe the vehicle", hint : "describe the vehicle"}]
        ]
    },
    {
        orc_no : '2923.16E3',
        content : `
        did knowingly fail to inform Law Enforcement Officers of his/her CCW permim
        contrary to and in violation of Section 2923.16 of the Revised Code of Ohio, a misdemeanor of the fourth degree.
        `,
        field_options:[]
    },
    {
        orc_no : '2923.17A',
        content : `
        did, FIELD1 dangerous ordnance, to-wit FIELD2 , contrary to and in violation of
        Section 2923.17(A) of the Revised Code of Ohio, a Felony of the fifth degree.
        `,
        field_options:[
            ["acquire","have","carry","use"],
            [{ type: "select", data_source: "property", hint : "describe the weapon"}]
        ]
    },
    {
        orc_no : '2923.121',
        content : `
        did knowingly possess a firearm to wit FIELD1,Contrary to and in
        violation of Section 2923.121 of the Revised Code of Ohio, a felony of the fifth degree.
        `,
        field_options:[
            [{ type: "select", data_source: "property", hint : "describe the device or instrument"}]
        ]
    },
    {
        orc_no : '2925.02A1',
        content : `
        did knowingly by FIELD1 administer to another or induce or cause another to use a
        controlled substance, to wit: FIELD2, contrary to
        and in violation of Section 2925.02(A)(1) of the Ohio Revised Code, a FIELD3.
        `,
        field_options:[
            ["force","threat","deception"],
            [{ type: "select", data_source: "property", hint : "Type of controlled substance"}],
            ["[M1]","[F5]","[F4]","[F3]","[F2]","[F1]"]
        ]
    },
    {
        orc_no : '2925.02A2',
        content : `
        did knowingly by any means, administer or furnish to another or induce or cause another to use a controlled substance
        with purpose to cause serious physical harm to the other person, or with purpose to cause the other person to become
        drug dependent, contrary to and in violation of Section 2925.02(A)(2) of the Ohio Revised Code,
        a FIELD1.
        `,
        field_options:[
            ["[M1]","[F5]","[F4]","[F3]","[F2]","[F1]"]
        ]
    },
    {
        orc_no : '2925.02A3',
        content : `
        did knowingly by any means, administer or furnish to another or induce or cause another to use a controlled substance, and thereby cause serious physical harm to the other person, or cause the other person to become drug dependent, contrary to and in violation of Section 2925.02(A)(3) of the Ohio Revised Code, a * FIELD1.
        `,
        field_options:[
            ["[M1]","[F5]","[F4]","[F3]","[F2]","[F1]"]
        ]
    },
    {
        orc_no : '2925.02A4',
        content : `
        did knowingly by any means, FIELD1 ,
        contrary to and in violation of Section 2925.02(A)(4) of the Ohio Revised Code, a FIELD2.
        `,
        field_options:[
            [
                "Furnish or administer a controlled substance to a juvenile who is at least two years the offender's junior, when the offender knows the age of the juvenile or is reckless in that regard",
                "Induce or cause a juvenile who is at least two years the offender's junior to use a controlled substance, when the offender knows the age of the juvenile or is reckless in that regard",
                "Induce or cause a juvenile who is at least two years the offender's junior to commit a felony drug abuse offense, when the offender knows the age of the juvenile or is reckless in that regard",
                "Use a juvenile, whether or not the offender knows the age of the juvenile, to perform any surveillance activity that is intended to prevent the detection of the offender or any other person in the commission of a felony drug abuse offense or to prevent the arrest of the offender or any other person for the commission of a felony drug abuse offense"
            ],
            ["[M1]","[F5]","[F4]","[F3]","[F2]","[F1]"]
        ]
    },
    {
        orc_no : '2925.02A4A',
        content : `
        did knowingly by any means, FIELD1 ,
        contrary to and in violation of Section 2925.02(A)(4) of the Ohio Revised Code, a FIELD2.
        `,
        field_options:[
            [
                "Furnish or administer a controlled substance to a juvenile who is at least two years the offender's junior, when the offender knows the age of the juvenile or is reckless in that regard"
            ],
            ["[M1]","[F5]","[F4]","[F3]","[F2]","[F1]"]
        ]
    },
    {
        orc_no : '2925.02A4B',
        content : `
        did knowingly by any means, FIELD1 ,
        contrary to and in violation of Section 2925.02(A)(4) of the Ohio Revised Code, a FIELD2.
        `,
        field_options:[
            [
                "Induce or cause a juvenile who is at least two years the offender's junior to use a controlled substance, when the offender knows the age of the juvenile or is reckless in that regard"
            ],
            ["[M1]","[F5]","[F4]","[F3]","[F2]","[F1]"]
        ]
    },
    {
        orc_no : '2925.02A4C',
        content : `
        did knowingly by any means, FIELD1 ,
        contrary to and in violation of Section 2925.02(A)(4) of the Ohio Revised Code, a FIELD2.
        `,
        field_options:[
            [
                "Induce or cause a juvenile who is at least two years the offender's junior to commit a felony drug abuse offense, when the offender knows the age of the juvenile or is reckless in that regard"
            ],
            ["[M1]","[F5]","[F4]","[F3]","[F2]","[F1]"]
        ]
    },
    {
        orc_no : '2925.02A4D',
        content : `
        did knowingly by any means, FIELD1 ,
        contrary to and in violation of Section 2925.02(A)(4) of the Ohio Revised Code, a FIELD2.
        `,
        field_options:[
            [
                "Use a juvenile, whether or not the offender knows the age of the juvenile, to perform any surveillance activity that is intended to prevent the detection of the offender or any other person in the commission of a felony drug abuse offense or to prevent the arrest of the offender or any other person for the commission of a felony drug abuse offense"
            ],
            ["[M1]","[F5]","[F4]","[F3]","[F2]","[F1]"]
        ]
    },
    {
        orc_no : '2925.02A5',
        content : `
        did knowingly by any means, furnish or administer a controlled substance to a pregnant woman or induce or cause a
        pregnant woman to use a controlled substance, when the offender knows that the woman is pregnant or is reckless
        in that regard, contrary to and in violation of Section 2925.02(A)(5) of the Ohio Revised Code,
        a FIELD1.
        `,
        field_options:[
            ["[M1]","[F5]","[F4]","[F3]","[F2]","[F1]"]
        ]
    },
    {
        orc_no : '2925.03',
        content : `
        did knowingly FIELD1 a schedule FIELD2 controlled substance, to wit:
        FIELD3, in an amount FIELD4, contrary to
        and in violation of Section 2925.03 of the Ohio Revised Code, a FIELD5.
        `,
        field_options:[
            ["sell","offer to sell","prepare for shipment","prepare for distribution","give"],
            [{ type: "text", placeholder: "Controlled substance schedule", hint : "Controlled substance schedule"}],
            [{ type: "select", data_source: "property", hint : "Type of controlled substance"}],
            [{ type: "text", placeholder: "amount"}],
            ["[M1]","[F5]","[F4]","[F3]","[F2]","[F1]"]
        ]
    },
    {
        orc_no : '2925.03A1',
        content : `
        did knowingly FIELD1 a schedule FIELD2 controlled substance, to wit:
        FIELD3, in an amount FIELD4, contrary to
        and in violation of Section 2925.03 of the Ohio Revised Code, a FIELD5.
        `,
        field_options:[
            ["sell","offer to sell"],
            [{ type: "text", placeholder: "Controlled substance schedule", hint : "Controlled substance schedule"}],
            [{ type: "select", data_source: "property", hint : "Type of controlled substance"}],
            [{ type: "text", placeholder: "amount"}],
            ["[M1]","[F5]","[F4]","[F3]","[F2]","[F1]"]
        ]
    },
    {
        orc_no : '2925.03A2',
        content : `
        did knowingly FIELD1 a schedule FIELD2 controlled substance, to wit:
        FIELD3, in an amount FIELD4, contrary to
        and in violation of Section 2925.03 of the Ohio Revised Code, a FIELD5.
        `,
        field_options:[
            ["prepare for shipment","prepare for distribution"],
            [{ type: "text", placeholder: "Controlled substance schedule", hint : "Controlled substance schedule"}],
            [{ type: "select", data_source: "property", hint : "Type of controlled substance"}],
            [{ type: "text", placeholder: "amount"}],
            ["[M1]","[F5]","[F4]","[F3]","[F2]","[F1]"]
        ]
    },
    {
        orc_no : '2925.11',
        content : `
        did knowingly FIELD1 a schedule FIELD2 controlled substance
        to wit: FIELD3,
        in an amount FIELD4,
        contrary to and in violation of Section 2925.11 of the Ohio Revised Code, a FIELD5.
        `,
        field_options:[
            ["obtain","possess","use"],
            [{ type: "select", options: ["I","II","III","IV","V"] , hint : "Controlled substance schedule"}],
            [{ type: "select", data_source: "property", hint : "Type of controlled substance"}],
            [{ type: "text", placeholder: "amount"}],
            ["[M1]","[F5]","[F4]","[F3]","[F2]","[F1]"]
        ]
    },
    {
        orc_no : '2925.11C1',
        content : `
        did knowingly FIELD1 a schedule FIELD2 controlled substance
        to wit: FIELD3,
        in an amount FIELD4,
        contrary to and in violation of Section 2925.11 of the Ohio Revised Code, a FIELD5.
        `,
        field_options:[
            ["obtain","possess","use"],
            [{ type: "select", options: ["I","II"] , hint : "Controlled substance schedule"}],
            [{ type: "select", data_source: "property", hint : "Type of controlled substance"}],
            [{ type: "text", placeholder: "amount"}],
            ["[M1]","[F5]","[F4]","[F3]","[F2]","[F1]"]
        ]
    },
    {
        orc_no : '2925.11C2',
        content : `
        did knowingly FIELD1 a schedule FIELD2 controlled substance
        to wit: FIELD3,
        in an amount FIELD4,
        contrary to and in violation of Section 2925.11 of the Ohio Revised Code, a FIELD5.
        `,
        field_options:[
            ["obtain","possess","use"],
            [{ type: "select", options: ["III","IV","V"] , hint : "Controlled substance schedule"}],
            [{ type: "select", data_source: "property", hint : "Type of controlled substance"}],
            [{ type: "text", placeholder: "amount"}],
            ["[M1]","[F5]","[F4]","[F3]","[F2]","[F1]"]
        ]
    },
    {
        orc_no : '2925.11C3',
        content : `
        did knowingly FIELD1 a schedule FIELD2 controlled substance
        to wit: FIELD3,
        in an amount FIELD4,
        contrary to and in violation of Section 2925.11 of the Ohio Revised Code, a FIELD5.
        `,
        field_options:[
            ["obtain","possess","use"],
            [{ type: "select", options: ["I","II","III","IV","V"] , hint : "Controlled substance schedule"}],
            [{ type: "text", value: "marijuana" , placeholder: "Type of controlled substance"}],
            [{ type: "text", placeholder: "amount"}],
            ["[M1]","[F5]","[F4]","[F3]","[F2]","[F1]"]
        ]
    },
    {
        orc_no : '2925.11C4',
        content : `
        did knowingly FIELD1 a schedule FIELD2 controlled substance
        to wit: FIELD3,
        in an amount FIELD4,
        contrary to and in violation of Section 2925.11 of the Ohio Revised Code, a FIELD5.
        `,
        field_options:[
            ["obtain","possess","use"],
            [{ type: "select", options: ["I","II","III","IV","V"] , hint : "Controlled substance schedule"}],
            [{ type: "text", value: "cocaine" , placeholder: "Type of controlled substance"}],
            [{ type: "text", placeholder: "amount"}],
            ["[M1]","[F5]","[F4]","[F3]","[F2]","[F1]"]
        ]
    },
    {
        orc_no : '2925.11C5',
        content : `
        did knowingly FIELD1 a schedule FIELD2 controlled substance
        to wit: FIELD3,
        in an amount FIELD4,
        contrary to and in violation of Section 2925.11 of the Ohio Revised Code, a FIELD5.
        `,
        field_options:[
            ["obtain","possess","use"],
            [{ type: "select", options: ["I","II","III","IV","V"] , hint : "Controlled substance schedule"}],
            [{ type: "text", value: "L.S.D." , placeholder: "Type of controlled substance"}],
            [{ type: "text", placeholder: "amount"}],
            ["[M1]","[F5]","[F4]","[F3]","[F2]","[F1]"]
        ]
    },
    {
        orc_no : '2925.11C6',
        content : `
        did knowingly FIELD1 a schedule FIELD2 controlled substance
        to wit: FIELD3,
        in an amount FIELD4,
        contrary to and in violation of Section 2925.11 of the Ohio Revised Code, a FIELD5.
        `,
        field_options:[
            ["obtain","possess","use"],
            [{ type: "select", options: ["I","II","III","IV","V"] , hint : "Controlled substance schedule"}],
            [{ type: "text", value: "heroin" , placeholder: "Type of controlled substance"}],
            [{ type: "text", placeholder: "amount"}],
            ["[M1]","[F5]","[F4]","[F3]","[F2]","[F1]"]
        ]
    },
    {
        orc_no : '2925.11C7',
        content : `
        did knowingly FIELD1 a schedule FIELD2 controlled substance
        to wit: FIELD3,
        in an amount FIELD4,
        contrary to and in violation of Section 2925.11 of the Ohio Revised Code, a FIELD5.
        `,
        field_options:[
            ["obtain","possess","use"],
            [{ type: "select", options: ["I","II","III","IV","V"] , hint : "Controlled substance schedule"}],
            [{ type: "text", value: "hashish" , placeholder: "Type of controlled substance"}],
            [{ type: "text", placeholder: "amount"}],
            ["[M1]","[F5]","[F4]","[F3]","[F2]","[F1]"]
        ]
    },
    {
        orc_no : '2925.11C8',
        content : `
        did knowingly FIELD1 a schedule FIELD2 controlled substance
        to wit: FIELD3,
        in an amount FIELD4,
        contrary to and in violation of Section 2925.11 of the Ohio Revised Code, a FIELD5.
        `,
        field_options:[
            ["obtain","possess","use"],
            [{ type: "select", options: ["I","II","III","IV","V"] , hint : "Controlled substance schedule"}],
            [{ type: "text", value: "analog" , placeholder: "Type of controlled substance"}],
            [{ type: "text", placeholder: "amount"}],
            ["[M1]","[F5]","[F4]","[F3]","[F2]","[F1]"]
        ]
    },
    {
        orc_no : '2925.12',
        content : `
        did knowingly make , obtain, possess, or use an instrument, article, or thing the customary and
        the primary purpose of which is for the administration or use of a dangerous drug, other than marihuana, when the
        instrument is a hypodermic or syringe, whether or not of crude or extemporized manufacture or assembly, and then said
        instrument, article, or thing involved has been used by the offender to unlawfully administer or use a dangerous drug,
        other than marihuana , or to prepare a dangerous drug, other than marihuana, for unlawful administration or use dangerous
        drug to wit FIELD1,
        contrary to and in violation of Section 2925.12 of the Ohio Revised Code, a misdemeanor of the FIELD2.
        `,
        field_options:[
            [{ type: "select", data_source: "property", hint : "Describe drug"}],
            ["[1st]","[2nd]","[3rd]","[4th]","[5th]"]
        ]
    },
    {
        orc_no : '2925.14C1',
        content : `
        did knowingly FIELD1 drug paraphernalia, to-wit
        FIELD2, contrary to and in violation of Section 2925.14 of the Revised
        Code of Ohio, a misdemeanor of the FIELD3 degree.
        `,
        field_options:[
            ["use","possess","with purpose to use"],
            [{ type: "select", data_source: "property", hint : "Describe paraphernalia"}],
            ["[1st]","[2nd]","[4th]"]
        ]
    },
    {
        orc_no : '2925.22',
        content : `
        did knowingly, by deception, procure FIELD1
        a dangerous drug to wit: FIELD2.
        Contrary to and in violation of Section 2925.22 (A) of the Revised Code of Ohio, a Felony of the FIELD3 degree.
        `,
        field_options:[
            ["The administration of","a prescription for","the dispensing of"],
            [{ type: "select", data_source: "property", hint : "Describe dangerous drug"}],
            [
                {
                    type:'select', 
                    options: ["[F5]","[F4]"],
                    hint: `
                    [F4] if the drug is a schedule I or II
                    [F5] if the drug is a schedule III, IV, or V
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2925.22A',
        content : `
        did knowingly, by deception, procure FIELD1
        a dangerous drug to wit: FIELD2.
        Contrary to and in violation of Section 2925.22 (A) of the Revised Code of Ohio, a Felony of the FIELD3 degree.
        `,
        field_options:[
            ["The administration of","a prescription for","the dispensing of"],
            [{ type: "select", data_source: "property", hint : "Describe dangerous drug"}],
            [
                {
                    type:'select', 
                    options: ["[F5]","[F4]"],
                    hint: `
                    [F4] if the drug is a schedule I or II
                    [F5] if the drug is a schedule III, IV, or V
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2925.23',
        content : `
        did knowingly FIELD1
        contrary to and in violation of Section 2925.23 of the Revised Code of Ohio, a Felony of the FIELD2 degree.
        `,
        field_options:[
            [
                "make a false statement in any prescription, order, report, or record required by Chapter 3719. or 4729. of the Revised Code",
                "did intentionally make, utter, sell, or possess a false or forged prescription uncompleted preprinted prescription blank",
                "by theft acquire a prescription, or an uncompleted preprinted prescription blank, or a blank written order",
                "make or affix any false or forged label to a package or receptacle containing any dangerous drugs"
            ],
            [{ type: "select", data_source: "property", hint : "Describe dangerous drug"}],
            [
                {
                    type:'select', 
                    options: ["[F5]","[F4]"],
                    hint: `
                    [F4] If the drug is a Schedule I or II with the exception of Marijuana
                    [F5] If the drug is a dangerous drug or a Schedule III, IV or V or is Marijuana
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2925.23A',
        content : `
        did knowingly FIELD1
        contrary to and in violation of Section 2925.23 of the Revised Code of Ohio, a Felony of the FIELD2 degree.
        `,
        field_options:[
            [
                "make a false statement in any prescription, order, report, or record required by Chapter 3719. or 4729. of the Revised Code",
            ],
            [{ type: "select", data_source: "property", hint : "Describe dangerous drug"}],
            [
                {
                    type:'select', 
                    options: ["[F5]","[F4]"],
                    hint: `
                    [F4] If the drug is a Schedule I or II with the exception of Marijuana
                    [F5] If the drug is a dangerous drug or a Schedule III, IV or V or is Marijuana
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2925.23B1',
        content : `
        did knowingly FIELD1
        contrary to and in violation of Section 2925.23 of the Revised Code of Ohio, a Felony of the FIELD2 degree.
        `,
        field_options:[
            [
                "did intentionally make, utter, sell, or possess a false or forged prescription",
            ],
            [{ type: "select", data_source: "property", hint : "Describe dangerous drug"}],
            [
                {
                    type:'select', 
                    options: ["[F5]","[F4]"],
                    hint: `
                    [F4] If the drug is a Schedule I or II with the exception of Marijuana
                    [F5] If the drug is a dangerous drug or a Schedule III, IV or V or is Marijuana
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2925.23B2',
        content : `
        did knowingly FIELD1
        contrary to and in violation of Section 2925.23 of the Revised Code of Ohio, a Felony of the FIELD2 degree.
        `,
        field_options:[
            [
                "did intentionally make, utter, sell, or possess a false or forged prescription uncompleted preprinted prescription blank",
            ],
            [{ type: "select", data_source: "property", hint : "Describe dangerous drug"}],
            [
                {
                    type:'select', 
                    options: ["[F5]","[F4]"],
                    hint: `
                    [F4] If the drug is a Schedule I or II with the exception of Marijuana
                    [F5] If the drug is a dangerous drug or a Schedule III, IV or V or is Marijuana
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2925.23B3',
        content : `
        did knowingly FIELD1
        contrary to and in violation of Section 2925.23 of the Revised Code of Ohio, a Felony of the FIELD2 degree.
        `,
        field_options:[
            [
                "did intentionally make, utter, sell, or possess false or forged official written order",
            ],
            [{ type: "select", data_source: "property", hint : "Describe dangerous drug"}],
            [
                {
                    type:'select', 
                    options: ["[F5]","[F4]"],
                    hint: `
                    [F4] If the drug is a Schedule I or II with the exception of Marijuana
                    [F5] If the drug is a dangerous drug or a Schedule III, IV or V or is Marijuana
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2925.23B4',
        content : `
        did knowingly FIELD1
        contrary to and in violation of Section 2925.23 of the Revised Code of Ohio, a Felony of the FIELD2 degree.
        `,
        field_options:[
            [
                "did intentionally make, utter, sell, or possess false or forged license for terminal distributor of dangerous drugs",
            ],
            [{ type: "select", data_source: "property", hint : "Describe dangerous drug"}],
            [
                {
                    type:'select', 
                    options: ["[F5]","[F4]"],
                    hint: `
                    [F4] If the drug is a Schedule I or II with the exception of Marijuana
                    [F5] If the drug is a dangerous drug or a Schedule III, IV or V or is Marijuana
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2925.23B5',
        content : `
        did knowingly FIELD1
        contrary to and in violation of Section 2925.23 of the Revised Code of Ohio, a Felony of the FIELD2 degree.
        `,
        field_options:[
            [
                "did intentionally make, utter, sell, or possess false or forged registration certificate for wholesale distributor",
            ],
            [{ type: "select", data_source: "property", hint : "Describe dangerous drug"}],
            [
                {
                    type:'select', 
                    options: ["[F5]","[F4]"],
                    hint: `
                    [F4] If the drug is a Schedule I or II with the exception of Marijuana
                    [F5] If the drug is a dangerous drug or a Schedule III, IV or V or is Marijuana
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2925.23C1',
        content : `
        did knowingly FIELD1
        contrary to and in violation of Section 2925.23 of the Revised Code of Ohio, a Felony of the FIELD2 degree.
        `,
        field_options:[
            [
                "by theft acquire a prescription"

            ],
            [{ type: "select", data_source: "property", hint : "Describe dangerous drug"}],
            [
                {
                    type:'select', 
                    options: ["[F5]","[F4]"],
                    hint: `
                    [F4] If the drug is a Schedule I or II with the exception of Marijuana
                    [F5] If the drug is a dangerous drug or a Schedule III, IV or V or is Marijuana
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2925.23C2',
        content : `
        did knowingly FIELD1
        contrary to and in violation of Section 2925.23 of the Revised Code of Ohio, a Felony of the FIELD2 degree.
        `,
        field_options:[
            [
                "by theft acquire an uncompleted preprinted prescription blank"
            ],
            [{ type: "select", data_source: "property", hint : "Describe dangerous drug"}],
            [
                {
                    type:'select', 
                    options: ["[F5]","[F4]"],
                    hint: `
                    [F4] If the drug is a Schedule I or II with the exception of Marijuana
                    [F5] If the drug is a dangerous drug or a Schedule III, IV or V or is Marijuana
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2925.23C3',
        content : `
        did knowingly FIELD1
        contrary to and in violation of Section 2925.23 of the Revised Code of Ohio, a Felony of the FIELD2 degree.
        `,
        field_options:[
            [
                "by theft acquire a official written order",
            ],
            [{ type: "select", data_source: "property", hint : "Describe dangerous drug"}],
            [
                {
                    type:'select', 
                    options: ["[F5]","[F4]"],
                    hint: `
                    [F4] If the drug is a Schedule I or II with the exception of Marijuana
                    [F5] If the drug is a dangerous drug or a Schedule III, IV or V or is Marijuana
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2925.23C4',
        content : `
        did knowingly FIELD1
        contrary to and in violation of Section 2925.23 of the Revised Code of Ohio, a Felony of the FIELD2 degree.
        `,
        field_options:[
            [
                "by theft acquire a blank written order",
            ],
            [{ type: "select", data_source: "property", hint : "Describe dangerous drug"}],
            [
                {
                    type:'select', 
                    options: ["[F5]","[F4]"],
                    hint: `
                    [F4] If the drug is a Schedule I or II with the exception of Marijuana
                    [F5] If the drug is a dangerous drug or a Schedule III, IV or V or is Marijuana
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2925.23C5',
        content : `
        did knowingly FIELD1
        contrary to and in violation of Section 2925.23 of the Revised Code of Ohio, a Felony of the FIELD2 degree.
        `,
        field_options:[
            [
                "by theft acquire a license for terminal distributor",
            ],
            [{ type: "select", data_source: "property", hint : "Describe dangerous drug"}],
            [
                {
                    type:'select', 
                    options: ["[F5]","[F4]"],
                    hint: `
                    [F4] If the drug is a Schedule I or II with the exception of Marijuana
                    [F5] If the drug is a dangerous drug or a Schedule III, IV or V or is Marijuana
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2925.23C6',
        content : `
        did knowingly FIELD1
        contrary to and in violation of Section 2925.23 of the Revised Code of Ohio, a Felony of the FIELD2 degree.
        `,
        field_options:[
            [
                "by theft acquire a registration certificate",
            ],
            [{ type: "select", data_source: "property", hint : "Describe dangerous drug"}],
            [
                {
                    type:'select', 
                    options: ["[F5]","[F4]"],
                    hint: `
                    [F4] If the drug is a Schedule I or II with the exception of Marijuana
                    [F5] If the drug is a dangerous drug or a Schedule III, IV or V or is Marijuana
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2925.37',
        content : `
        did knowingly FIELD1
        FIELD2
        FIELD3 a of the FIELD4 degree contrary to and in violation of Section 2925.37 of the Ohio Revised Code.
        `,
        field_options:[
            [
                "possess",
                "make, sell, offer to sell, or deliver",
                "make, possess, sell, offer to sell, or deliver",
                "sell, offer to sell,give or deliver",
                "directly or indirectly represent",
                "directly or indirectly falsely represent or advertise"
            ],
            [
                "any counterfeit controlled substance",
                "any substance knowing it is a counterfeit controlled substance",
                "any punch,die, plate, stone or other device knowing or having reason to know that it will be used to print or reproduce a trademark, tradename or other identifying mark upon a counterfeit controlled substance"
            ],
            ["felony","misdemeanor"],
            [
                {
                    type:'select', 
                    options: ["[M1]","[F4]","[F5]"],
                    hint: `
                    [M1] possession of counterfeit controlled substances
                    [F4] if the offense was committed in the vicinity of a school or in the vicinity of a juvenile
                    [F5] trafficking in counterfeit controlled substances
                    [F5] promoting and encouraging drug abuse
                    [F5] fraudulent drug advertising
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2925.37A',
        content : `
        did knowingly FIELD1
        FIELD2
        FIELD3 a of the FIELD4 degree contrary to and in violation of Section 2925.37 of the Ohio Revised Code.
        `,
        field_options:[
            [
                "possess"
            ],
            [
                "any counterfeit controlled substance",
                "any substance knowing it is a counterfeit controlled substance",
                "any punch,die, plate, stone or other device knowing or having reason to know that it will be used to print or reproduce a trademark, tradename or other identifying mark upon a counterfeit controlled substance"
            ],
            ["felony","misdemeanor"],
            [
                {
                    type:'select', 
                    options: ["[M1]","[F4]","[F5]"],
                    hint: `
                    [M1] possession of counterfeit controlled substances
                    [F4] if the offense was committed in the vicinity of a school or in the vicinity of a juvenile
                    [F5] trafficking in counterfeit controlled substances
                    [F5] promoting and encouraging drug abuse
                    [F5] fraudulent drug advertising
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2925.37B',
        content : `
        did knowingly FIELD1
        FIELD2
        FIELD3 a of the FIELD4 degree contrary to and in violation of Section 2925.37 of the Ohio Revised Code.
        `,
        field_options:[
            [
                "make, sell, offer to sell, or deliver",
            ],
            [
                "any counterfeit controlled substance",
                "any substance knowing it is a counterfeit controlled substance",
                "any punch,die, plate, stone or other device knowing or having reason to know that it will be used to print or reproduce a trademark, tradename or other identifying mark upon a counterfeit controlled substance"
            ],
            ["felony","misdemeanor"],
            [
                {
                    type:'select', 
                    options: ["[M1]","[F4]","[F5]"],
                    hint: `
                    [M1] possession of counterfeit controlled substances
                    [F4] if the offense was committed in the vicinity of a school or in the vicinity of a juvenile
                    [F5] trafficking in counterfeit controlled substances
                    [F5] promoting and encouraging drug abuse
                    [F5] fraudulent drug advertising
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2925.37E',
        content : `
        did knowingly FIELD1
        FIELD2
        FIELD3 a of the FIELD4 degree contrary to and in violation of Section 2925.37 of the Ohio Revised Code.
        `,
        field_options:[
            [
                "directly or indirectly represent"
            ],
            [
                "any counterfeit controlled substance",
                "any substance knowing it is a counterfeit controlled substance",
                "any punch,die, plate, stone or other device knowing or having reason to know that it will be used to print or reproduce a trademark, tradename or other identifying mark upon a counterfeit controlled substance"
            ],
            ["felony","misdemeanor"],
            [
                {
                    type:'select', 
                    options: ["[M1]","[F4]","[F5]"],
                    hint: `
                    [M1] possession of counterfeit controlled substances
                    [F4] if the offense was committed in the vicinity of a school or in the vicinity of a juvenile
                    [F5] trafficking in counterfeit controlled substances
                    [F5] promoting and encouraging drug abuse
                    [F5] fraudulent drug advertising
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2925.37F',
        content : `
        did knowingly FIELD1
        FIELD2
        FIELD3 a of the FIELD4 degree contrary to and in violation of Section 2925.37 of the Ohio Revised Code.
        `,
        field_options:[
            [
                "directly or indirectly falsely represent or advertise"
            ],
            [
                "any counterfeit controlled substance",
                "any substance knowing it is a counterfeit controlled substance",
                "any punch,die, plate, stone or other device knowing or having reason to know that it will be used to print or reproduce a trademark, tradename or other identifying mark upon a counterfeit controlled substance"
            ],
            ["felony","misdemeanor"],
            [
                {
                    type:'select', 
                    options: ["[M1]","[F4]","[F5]"],
                    hint: `
                    [M1] possession of counterfeit controlled substances
                    [F4] if the offense was committed in the vicinity of a school or in the vicinity of a juvenile
                    [F5] trafficking in counterfeit controlled substances
                    [F5] promoting and encouraging drug abuse
                    [F5] fraudulent drug advertising
                    `
                }
            ]
        ]
    },
    {
        orc_no : '2925.141C',
        content : `
        did knowingly FIELD1 any drug paraphernalia for
        introducing marihuana into the human body, to-wit FIELD2,
        contrary to and in violation of Section 2925.141 of the Revised Code of Ohio, a minor misdemeanor.
        `,
        field_options:[
            ["use","possess","with purpose to use"],
            [{ type: "select", data_source: "property", hint : "Describe paraphernalia"}]
        ]
    },
    {
        orc_no : '3743.65A',
        content : `
        did knowingly possess fireworks in this state or shall possess for sale or sell fireworks in this state, except a licensed manufacturer of fireworks as authorized by sections 3743.02 to 3743.08 of the Revised Code, a licensed wholesaler of fireworks as authorized by sections 3743.15 to 3743.21 of the Revised Code, a shipping permit holder as authorized by section 3743.40 of the Revised Code, an out-of-state resident as authorized by section 3743.44 of the Revised Code, a resident of this state as authorized by section 3743.45 of the Revised Code, or a licensed exhibitor of fireworks as authorized by sections 3743.50 to 3743.55 of the Revised Code, and except as provided in section 3743.80 of the Revised Code, contrary to and in violation of Section 3743-65 of the Ohio Revised Code, a misdemeanor of the first degree.
        `,
        field_options:[]
    },
    {
        orc_no : '4301.69A',
        content : `
        did, while being under the age of twenty-one, knowingly FIELD1 a beer or an
        intoxicating liquor, to-wit FIELD2, contrary to and in violation of
        Section 4301.69 of the Revised Code of Ohio, a misdemeanor of the first degree.        
        `,
        field_options:[
            ["order","pay for","share the cost of","attemp to purchase","consume","possess"],
            [{ type: "select", data_source: "property", hint : "Describe the alcoholic beverage"}]
        ]
    },
];

function getComplaintArresteeAddress(arrestee_detail, master_name_data)
{
    master_name_data = master_name_data || {};
    
    var address = master_name_data.address;
    var isMasterAddress= true;

    if (! address)
        address = master_name_data.address2;
    
    if (! address)
    {
        address = arrestee_detail.arrestee_address;
        isMasterAddress=false;
    }


    var splits= address.split(',')
                .filter(p=> p.trim() && p.trim().toLowerCase() !== "usa" && p.trim().toLowerCase() !== "united states" && p.trim().toLowerCase() !== "united states of america" )
                .map(p=> p.trim());

    var zipCodeIndex = splits.findIndex(p=> ! isNaN(p));

    var zipcode = null;

    if (zipCodeIndex > -1) {
        zipcode = splits.splice(zipCodeIndex,1);
    }

    var address1= splits.shift();

    address2 = splits.slice();

    if (address2.length == 0)
    {
        if (isMasterAddress)
        {
            if (master_name_data.city) address2.push(master_name_data.city);
            if (master_name_data.state) address2.push(master_name_data.state);
        }
        else
        {
            if (arrestee_detail.arrestee_city) address2.push(arrestee_detail.arrestee_city);
            if (arrestee_detail.arrestee_state) address2.push(arrestee_detail.arrestee_state);
        }
    }

    if (! zipcode)
    {
        if (isMasterAddress)
            zipcode = master_name_data.zip_code;
        else
            zipcode = arrestee_detail.arrestee_zip_code;
    }

    if (zipcode)
    {
        address2.push(zipcode);
    }

    address2 = address2.join(', ');

    return { address1, address2 };
}

var spanComplaintChargeNarrativeInitialText = null;

function fillComplaintChargeNarrativeFields(spanComplaintChargeNarrative, pageIndex ,  orc_no, values){

    if (spanComplaintChargeNarrativeInitialText == null)
    {
        spanComplaintChargeNarrativeInitialText = spanComplaintChargeNarrative.text();
    }
    
    var foundCrime = complaint_form_crime_types.find(crime => crime.orc_no == orc_no );

    if (! foundCrime)
    {
        //alert(`There is no sample form for ${orc_no}. For better result, please provide a sample form of ${orc_no} to Peel9 if exists`);

        var content2= values.chargeDescription;

        content2 += `
            The complainant states that this complaint is based on ${values.arrestNarrative}
        `;

        spanComplaintChargeNarrative.html(spanComplaintChargeNarrativeInitialText + content2);

        return;
    }

    var content = foundCrime.content;

    for (let i = 0; i < foundCrime.field_options.length; i++) {

        const fieldOptions = foundCrime.field_options[i];
        
        if (fieldOptions.length == 0) continue; 

        var allOptionsIsString = fieldOptions.filter(p=> typeof p === 'string').length === fieldOptions.length;

        if (allOptionsIsString)
        {
            if (fieldOptions.length == 1)
            {
                var textInput = `
                    <input class="field_input" placeholder="${ fieldOptions[0] }" value="${ fieldOptions[0] }" data-field-id="FIELD${ i + 1 }"  data-page-index="${ pageIndex }"/>
                    <span class="field_value" data-field-id="FIELD${ i + 1 }" data-page-index="${ pageIndex }">${ fieldOptions[0] }</span>
                `;

                content = content.replace(`FIELD${ i + 1 }`,textInput);
            }
            else
            {
                var selectInput = `<select class="field_input" data-field-id="FIELD${ i + 1 }" data-page-index="${ pageIndex }">`;

                for (const option of fieldOptions) {

                    selectInput += `<option value="${ option }">${ option }</option>`
                }

                selectInput += `<option value="Enter manually">Enter manually</option>`

                selectInput += '</select>';

                selectInput += `<span class="field_value" data-field-id="FIELD${ i + 1 }" data-page-index="${ pageIndex }">${ fieldOptions[0] }</span>`

                content = content.replace(`FIELD${ i + 1 }`, selectInput)
            }
        }
        else
        {
            var input_option = fieldOptions[0];

            if (typeof input_option === 'object')
            {
                let inputHtml= "";

                if (input_option.type == "text")
                {
                    inputHtml = `
                        <input class="field_input" placeholder value data-field-id="FIELD${ i + 1 }" data-page-index="${ pageIndex }"/>
                        <span class="field_value" data-field-id="FIELD${ i + 1 }">${ input_option.value ? input_option.value  : "" }</span>
                    `;

                    if (input_option.placeholder)
                    {
                        inputHtml = inputHtml.replace("placeholder",`placeholder="${ input_option.placeholder }"`);
                    }
                    else
                        inputHtml = inputHtml.replace("placeholder","");

                    if (input_option.value)
                    {
                        inputHtml = inputHtml.replace("value",`value="${ input_option.value }"`);
                    }
                    else
                        inputHtml = inputHtml.replace("value","");    

                    if (input_option.hint)
                    {
                        inputHtml += `<span class="hint" title="${ input_option.hint }"><i class="fa fa-info-circle"></i></span>`;
                    }
                }
                else if (input_option.type == "select")
                {
                    if (input_option.options && input_option.options.length > 0)
                    {
                        if (input_option.length == 1)
                        {
                            inputHtml = `
                                <input class="field_input" value="${ input_option.options[0] }" data-field-id="FIELD${ i + 1 }" data-page-index="${ pageIndex }"/>
                                <span class="field_value" data-field-id="FIELD${ i + 1 }" data-page-index="${ pageIndex }">${ input_option.options[0] }</span>
                            `;
                        }
                        else
                        {
                            inputHtml = `<select class="field_input" data-field-id="FIELD${ i + 1 }" data-page-index="${ pageIndex }">`;

                            for (const option of input_option.options) {

                                inputHtml += `<option value="${ option }">${ option }</option>`;
                            }

                            inputHtml += `<option value="Enter manually">Enter manually</option>`

                            inputHtml += '</select>';
                            
                            inputHtml += `<span class="field_value" data-field-id="FIELD${ i + 1 }" data-page-index="${ pageIndex }">${ input_option.options[0] }</span>`
                            
                            if (input_option.onChange)
                            {
                                $(document).on("change",`.page:eq(${ pageIndex }) select[data-field-id="FIELD${ i + 1 }"]`, input_option.onChange);
                            }
                        }
                    }
                    
                    
                    if (input_option.data_source == "property")
                    {
                        if (! values.incident_properties || values.incident_properties.length < 2)
                        {
                            var property_description = "";

                            if (values.incident_properties.length == 1){
                                property_description = `${ values.incident_properties[0].heading1 == 'Money' ? values.incident_properties[0].prop_value : values.incident_properties[0].quantity } ${ values.incident_properties[0].description }`
                            }

                            inputHtml = `
                                <input class="field_input" placeholder="describe property" value="${  property_description }" data-field-id="FIELD${ i + 1 }" data-page-index="${ pageIndex }"/>
                                <span class="field_value" data-field-id="FIELD${ i + 1 }" data-page-index="${ pageIndex }">${  property_description }</span>
                            `;
                        }
                        else
                        {
                            inputHtml = `<select class="field_input" data-field-id="FIELD${ i + 1 }" data-page-index="${ pageIndex }">`;

                            for (const option of values.incident_properties) {

                                var property_description = `${ option.heading1 == 'Money' ? option.prop_value : option.quantity } ${ option.description }`

                                inputHtml += `<option value="${ property_description }">${ property_description }</option>`;
                            }

                            inputHtml += `<option value="Enter manually">Enter manually</option>`

                            inputHtml += '</select>';

                            var property_description = `${ values.incident_properties[0].heading1 == 'Money' ? values.incident_properties[0].prop_value : values.incident_properties[0].quantity } ${ values.incident_properties[0].description }`
                            
                            inputHtml += `<span class="field_value" data-field-id="FIELD${ i + 1 }" data-page-index="${ pageIndex }">${ property_description }</span>`;

                            if (input_option.onChange)
                            {
                                $(document).on("change",`.page:eq(${ pageIndex }) select[data-field-id="FIELD${ i + 1 }"]`, input_option.onChange);
                            }
                        }
                    }

                    if (input_option.hint)
                    {
                        inputHtml += `<span class="hint">
                            <i class="fa fa-info-circle"></i>
                            <div class="hint-content">${ input_option.hint }</div>
                        </span>`;
                    }
                }

                content = content.replace(`FIELD${ i + 1 }`,inputHtml);
            }
        }
    }

    content += `
    <br/>
    The complainant states that this complaint is based on ${values.arrestNarrative}
    `;

    if (! values.isStateCourt)
    {
       content = content.replace(/Section.*(Revised Code of Ohio|Ohio Revised Code)/gi,`Section ${values.local_code} of the ${values.cityName} Code of Ordinances`);
    }

    spanComplaintChargeNarrative.html(spanComplaintChargeNarrativeInitialText + replaceWithRealData(content, values));

    $(document).on("input",`.page:eq(${ pageIndex }) input[data-field-id]`,function(){
                    
        var field_id = $(this).attr("data-field-id");

        $(`.page:eq(${ pageIndex }) span[data-field-id="${ field_id }"]`).text($(this).val());
    });

    $(document).on("change",`.page:eq(${ pageIndex }) select[data-field-id]`,function(){

        var field_id = $(this).attr("data-field-id");  

        var selected_value = $(this).val();

        $(`.page:eq(${ pageIndex }) span[data-field-id="${ field_id }"]`).text(selected_value);

        if (selected_value == "Enter manually")
        {
            var textInput = $(`<input class="field_input" placeholder="Enter manually" data-field-id="${ field_id }"/>`);

            $(this).after(textInput);

            var cancelButton = $(`<button type="button" class="btn btn-danger btn-xs cancel_button">Cancel</button>`);

            cancelButton.on('click',function(){
                $(this).prev('input').prev('select').show();
                $(this).prev('input').remove();
                $(this).remove();

                $(`.page:eq(${ pageIndex }) span[data-field-id="${ field_id }"]`).text('');
            });

            textInput.after(cancelButton);

            $(this).hide();
        }
    });
}

function runChangeEventHandler(options)
{
    let {select, searchValue = '' , inputValue='' , placeholder='', beforeStatement=''} = options;

    var pageIndex = select.attr("data-page-index");
    var fieldId = select.attr("data-field-id");

    var selected_value = select.val();

    var keyFound= false;

    if (Array.isArray(searchValue))
    {
        for (let searchKey of searchValue)
        {
            if (selected_value.includes(searchKey))
            {
                keyFound=true;
                break;
            }
        }
    }
    else if (typeof searchValue == 'string')
    {
        keyFound = selected_value.includes(searchValue);
    }

    if (keyFound)
    {
        var beforeStatementSpan = $(`<span class="before_statement">${ beforeStatement }</span>`);

        select.after(beforeStatementSpan);
        
        var textInput = $(`<input placeholder="${ placeholder }" value="${ inputValue }" class="field_input" data-field-id="${ fieldId }" data-page-index="${ pageIndex }"/>`);

        var inputEvent= function(){

            var field_id = $(this).attr("data-field-id");

            $(`.page:eq(${ pageIndex }) span.field_value[data-field-id="${ field_id }"]`).text(selected_value + beforeStatement + $(this).val() );
        };

        $(document).on('input',`.page:eq(${ pageIndex }) input[data-field-id="${ fieldId }"]`,inputEvent);

        beforeStatementSpan.after(textInput);

        var cancelButton = $(`<button type="button" class="btn btn-danger btn-xs cancel_button">Cancel</button>`);

        cancelButton.on('click',function(){

            $(this).prev().prev().prev('select').show();
            $(this).prev('.field_input').remove();
            $(this).prev('.field_input').prev('.before_statement').remove();
            $(this).remove();

            $(`.page:eq(${ pageIndex }) span.field_value[data-field-id="${ fieldId }"]`).text(selected_value);

            $(document).off('input',`.page:eq(${ pageIndex }) input[data-field-id="${ fieldId }"]`,inputEvent);
        });

        textInput.after(cancelButton);
    }
    else
    {
        var cancelButton = select.next().next().next('.cancel_button');
        
        if (cancelButton.length > 0)
        {
            cancelButton.trigger('click');
        }
    }
}

function replaceWithRealData(input, values)
{
    return input
        .replace(/NAME_OF_VICTIM/g, values.NAME_OF_VICTIM ? values.NAME_OF_VICTIM  : "NAME_OF_VICTIM" )
        .replace(/NAME_OF_DEFENDANT/g, values.NAME_OF_DEFENDANT ? values.NAME_OF_DEFENDANT : "NAME_OF_DEFENDANT")
        .replace(/LOCATION_OF_INCIDENT/g, values.LOCATION_OF_INCIDENT ? values.LOCATION_OF_INCIDENT : "LOCATION_OF_INCIDENT");
}

