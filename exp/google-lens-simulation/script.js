document.getElementById('search-image').addEventListener('click', function() {
    var imageUrl = document.getElementById('search-image').src;

    // 构建请求体
    var requestBody = JSON.stringify({
        imageInfo: {
            url: "https://i.imgur.com/JshCd3r.jpeg"  // 使用图片的URL进行搜索
        },
        // knowledgeRequest: {}
    });

    console.log('发送的请求体:', requestBody);  // 打印请求体

    // Bing Visual Search API请求
    fetch('https://api.bing.microsoft.com/v7.0/images/visualsearch', {
        method: 'POST',
        headers: {
            'Ocp-Apim-Subscription-Key': 'c6fef8008b724a39b7a0f85a91245cae',  // 替换为你的API密钥
            'Content-Type': 'application/json'
        },
        body: requestBody
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(errorData => {
                console.error('API请求错误详情:', errorData);  // 打印详细错误信息
                const resultsDiv = document.getElementById('results');
                // 打印错误细节，包含具体的错误参数
                if (errorData.errors && errorData.errors.length > 0) {
                    errorData.errors.forEach(err => {
                        console.error('错误代码:', err.code);
                        console.error('错误信息:', err.message);
                        console.error('参数:', err.parameter);
                        console.error('更多详情:', err.moreDetails);
                    });
                }
                resultsDiv.textContent = '搜索失败：' + JSON.stringify(errorData);  // 显示完整的错误信息
                throw new Error(`请求失败，状态码: ${response.status}`);
            });
        }
        console.log('API响应状态码:', response.status);  // 打印状态码
        return response.json();  // 成功时返回JSON数据
    })
    .then(data => {
        console.log('API返回的完整数据:', data);  // 打印完整API响应数据

        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = '';  // 清空之前的结果

        const tags = data.tags;
        if (tags && tags.length > 0) {
            tags.forEach(tag => {
                const tagElement = document.createElement('p');
                tagElement.textContent = `Tag: ${tag.displayName}`;
                resultsDiv.appendChild(tagElement);

                const actions = tag.actions;
                if (actions) {
                    actions.forEach(action => {
                        const actionElement = document.createElement('p');
                        actionElement.textContent = `Action: ${action.actionType} - ${action.displayName}`;
                        resultsDiv.appendChild(actionElement);
                    });
                }
            });
        } else {
            resultsDiv.textContent = '没有找到相关结果';
        }
    })
    .catch(error => {
        console.error('API请求失败:', error.message);  // 打印错误信息
        const resultsDiv = document.getElementById('results');
        resultsDiv.textContent = '搜索失败：' + error.message;
    });
});
