const testUserDataFoodDiary = {
    "2020/08/17": {
        food: [
            {type: "Breakfast", time: 2020-08-17T10:00:00.000Z, details: "Ready brek with sultanas"},
            {type: "Lunch", time: 2020-08-17T12:05:00.000Z, details: "Pasta carbonara with bacon and peas"},
            {type: "Dinner", time: "18:00", details: "Thai chicken curry with rice and vegetables"},
            {type: "Snack", time: "21:00",  details: "Hot chocolate"},
            {type: "Notes", details: "Don't feel overly hungry except at bedtime, Drank 2 litres of squash 8am to 7pm, still thirsty. Felt very tired and quite light-headed in the morning and at lunch time, but was awake 5am to 7am with Ethan which could explain it."},
            {type: "Training", details: "Went for 30 minute stroll pushing buggy"}
            {type: "Breakfast", time: "09:15", details: "Banana and yoghurt"},
            {type: "Lunch", time: "12:15", details: "cheese and chutney sandwich with cucumber and tomato"},
            {type: "Dinner", time: "18:00", details: "Sausages, cubed potatoes, roasted veg"},
            {type: "Snack", time: "11:45",  details: "1 slice toast and Marj"},
            {type: "Notes", time: 12, details: "Feel dizzy and breathless in the morning after going up and down stairs before breakfast. Went for short walk with kids at 11:15am, felt hungry and light headed so came home and had toast then lunch. Felt sluggish and tired."},
        ]},
}

const graphQLServerData = {
    "data": {
      "findId": {
        "_id": "277302948626694661",
        "UserId": "test",
        "fooddiary": {
          "data": [
            {
              "_id": "277302948761960965",
              "notes": "Don't feel overly hungry except at bedtime, Drank 2 litres of squash 8am to 7pm, still thirsty. Felt very tired and quite light-headed in the morning and at lunch time, but was awake 5am to 7am with Ethan which could explain it.",
              "training": "Went for 30 minute stroll pushing buggy",
              "date": "2020/08/17",
              "food": {
                "data": [
                  {
                    "type": "Breakfast",
                    "time": "10:00",
                    "details": "Ready brek with sultanas"
                  },
                  {
                    "type": "Lunch",
                    "time": "12:05",
                    "details": "Pasta carbonara with bacon and peas"
                  },
                  {
                    "type": "Dinner",
                    "time": "18:00",
                    "details": "Thai chicken curry with rice and vegetables"
                  },
                  {
                    "type": "Snack",
                    "time": "21:00",
                    "details": "Hot chocolate"
                  }
                ]
              }
            },
            {
              "_id": "277302948829069829",
              "notes": "Feel dizzy and breathless in the morning after going up and down stairs before breakfast. Went for short walk with kids at 11:15am, felt hungry and light headed so came home and had toast then lunch. Felt sluggish and tired.",
              "training": "",
              "date": "2020/08/18",
              "food": {
                "data": [
                  {
                    "type": "Breakfast",
                    "time": "09:15",
                    "details": "Banana and yoghurt"
                  },
                  {
                    "type": "Lunch",
                    "time": "12:15",
                    "details": "cheese and chutney sandwich with cucumber and tomato"
                  },
                  {
                    "type": "Dinner",
                    "time": "18:00",
                    "details": "Sausages, cubed potatoes, roasted veg"
                  },
                  {
                    "type": "Snack",
                    "time": "11:45",
                    "details": "1 slice toast and Marj"
                  }
                ]
              }
            }
          ]
        }
      }
    }
  }