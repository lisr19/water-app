var json = {
	"success": true,
	"data": {
		"Mix": {
			"categories": ["一", "二", "三", "四", "五", "六","日"],
			"series": [
				{
					"name": "折线",
					"data": [80, 70, 75, 65,60, 60,80],
					"type": "line",
					"color": "#75A1FA",
					
				},
				{
					"name": "柱1",
					"data": [70, 60, 65, 55,50, 60,75],
					"type": "column",
					"color": "#5B8FF9",
					
				}
				, 
				
				{
				"name": "曲面",
				"data": [60, 70, 75, 65,60, 60,80],
				"type": "area",
				"style": "curve",
				
			}
			, 
			
			]
		},
	},

}
module.exports = {
	data: json
}
