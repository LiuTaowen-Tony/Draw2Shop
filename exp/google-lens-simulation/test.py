import requests
import json

# 替换为你的 Bing Visual Search API 密钥
subscription_key = 'c6fef8008b724a39b7a0f85a91245cae'
search_url = "https://api.bing.microsoft.com/v7.0/images/visualsearch"

# 请求体，使用公开可访问的图片 URL
request_body = {
    "knowledgeRequest": json.dumps({"imageInfo": {
        "url": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-7V56QZzpNMuHljHWPSMMmG4T/user-ea1n1SBpuQ7ApZYw7MUYT7xE/img-IgNZTjzwgTErGZjBqLiZnmB2.png?st=2024-10-06T03%3A46%3A29Z&se=2024-10-06T05%3A46%3A29Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=d505667d-d6c1-4a0a-bac7-5c84a87759f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-10-05T23%3A22%3A45Z&ske=2024-10-06T23%3A22%3A45Z&sks=b&skv=2024-08-04&sig=gijOwWB6Y9CXcnMAGiRdkopZI747qeetsvmaThYeCFs%3D" 
    }})
}

headers = {
    'Ocp-Apim-Subscription-Key': 'c6fef8008b724a39b7a0f85a91245cae',
}

# 发送请求并检查响应
response = requests.post(search_url, headers=headers, files=request_body, params={"mkt": "en-us"})

if response.status_code == 200:
    print("API 调用成功!")
    print(response.json())  # 打印响应数据
else:
    print(f"API 调用失败，状态码: {response.status_code}")
    print(response.json())  # 打印错误信息
