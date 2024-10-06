import requests
import json

# 替换为你的 Bing Visual Search API 密钥
subscription_key = 'c6fef8008b724a39b7a0f85a91245cae'
search_url = "https://api.bing.microsoft.com/v7.0/images/visualsearch"

# 请求体，使用公开可访问的图片 URL
request_body = {
    "imageInfo": {
        "url": "https://i.imgur.com/JshCd3r.jpeg"
    }
}

headers = {
    'Ocp-Apim-Subscription-Key': 'c6fef8008b724a39b7a0f85a91245cae',
    'Content-Type': 'application/json'
}

# 发送请求并检查响应
response = requests.post(search_url, headers=headers, data=json.dumps(request_body))

if response.status_code == 200:
    print("API 调用成功!")
    print(response.json())  # 打印响应数据
else:
    print(f"API 调用失败，状态码: {response.status_code}")
    print(response.json())  # 打印错误信息
