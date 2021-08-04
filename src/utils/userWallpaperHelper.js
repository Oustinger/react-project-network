const wallpapersUrls = [
    'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg',
    'https://cdn.pixabay.com/photo/2018/09/23/18/30/drop-3698073_960_720.jpg',
    'https://cdn.pixabay.com/photo/2018/08/23/07/35/thunderstorm-3625405_960_720.jpg',
    'https://cdn.pixabay.com/photo/2018/08/21/23/29/forest-3622519_960_720.jpg',
    'https://cdn.pixabay.com/photo/2018/09/19/23/03/sunset-3689760_960_720.jpg',
    'https://cdn.pixabay.com/photo/2018/05/04/23/31/grass-3375344_960_720.jpg',
    'https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_960_720.jpg',
    'https://cdn.pixabay.com/photo/2018/06/22/15/32/soap-bubble-3490959_960_720.jpg',
    'https://cdn.pixabay.com/photo/2018/09/21/16/14/succulents-3693409_960_720.jpg',
    'https://cdn.pixabay.com/photo/2017/02/08/17/24/fantasy-2049567_960_720.jpg',
    'https://cdn.pixabay.com/photo/2018/06/01/23/07/sunrise-3447463_960_720.jpg',
    'https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821_960_720.jpg',
    'https://cdn.pixabay.com/photo/2014/09/14/18/04/dandelion-445228_960_720.jpg',
    'https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_960_720.jpg',
    'https://cdn.pixabay.com/photo/2018/07/08/01/44/mountains-3523153_960_720.jpg',
    'https://cdn.pixabay.com/photo/2016/10/20/18/35/earth-1756274_960_720.jpg',
    'https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171_960_720.jpg',
];

const getRandomIndex = (min, max) => Math.round(Math.random() * (max - min) + min);

const getWallpaperUrl = () => wallpapersUrls[getRandomIndex(0, wallpapersUrls.length - 1)];

export const addUsersWallpapers = (usersItems) => usersItems.map(item => ({ ...item, wallpaper: getWallpaperUrl() }));

export const addProfileWallpaper = (userData, loadedUsers) => {
    if (loadedUsers.length > 0) {
        const currentUser = loadedUsers.find(({ id }) => userData.userId === id);
        if (currentUser)
            return ({ ...userData, wallpaper: currentUser.wallpaper });
    }

    return ({ ...userData, wallpaper: getWallpaperUrl() });
}